using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
