using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Security.Cryptography;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        public UserController(draft1Context dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel modeli)
        {
            var sha = SHA256.Create();
            var asByteArrray = Encoding.Default.GetBytes(modeli.Password);
            var hashedInput = sha.ComputeHash(asByteArrray);
            modeli.Password = Convert.ToBase64String(hashedInput);

            var dbUser = _dataContext.Users.Where(u => u.Email == modeli.Email && u.Password == modeli.Password).FirstOrDefault();

            if (dbUser == null)
            {
                return BadRequest("Invaliiid");
            }
            return Ok(dbUser);
        }


        [HttpGet]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await _dataContext.Users.ToListAsync());
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var u = await _dataContext.Users.FindAsync(id);
            if (u == null)
                return BadRequest("User not found!");
            return Ok(u);
        }


        [HttpPost]
        public async Task<ActionResult<List<User>>> AddUser(User u)
        {
            var dbUser = _dataContext.Users.Where(user => user.Email == u.Email).FirstOrDefault();

            if (dbUser != null)
            {
                return BadRequest("Useri ekziston me qit email!");
            }

            var sha = SHA256.Create();
            var asByteArrray = Encoding.Default.GetBytes(u.Password);
            var hashedPassword = sha.ComputeHash(asByteArrray);
            u.Password = Convert.ToBase64String(hashedPassword);

            _dataContext.Users.Add(u);
            await _dataContext.SaveChangesAsync();
            return Ok(await _dataContext.Users.ToListAsync());
        }


        [HttpPut]
        public async Task<ActionResult<List<User>>> UpdateUser(User request)
        {
            var dbUser = await _dataContext.Users.FindAsync(request.IdUser);
            if (dbUser == null)
                return BadRequest("User not found!");

            dbUser.IdUser = request.IdUser;
            dbUser.Emri = request.Emri;
            dbUser.Mbiemri = request.Mbiemri;
            dbUser.Pozita = request.Pozita;
            dbUser.Email = request.Email;
            dbUser.Password = request.Password;
            dbUser.Nrtelefonit = request.Nrtelefonit;

            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Users.ToListAsync());
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<List<User>>> Delete(int id)
        {
            var dbUser = await _dataContext.Users.FindAsync(id);
            if (dbUser == null)
                return BadRequest("User not found!");

            _dataContext.Users.Remove(dbUser);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.Users.ToListAsync());
        }
    }
}