using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Security.Cryptography;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;
using static Hospital_Management_System.Controllers.ActivityLogUserController;

namespace Hospital_Management_System.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly draft1Context _dataContext;
        private readonly IConfiguration _configuration;
        public UserController(draft1Context dataContext, IConfiguration configuration)
        {
            _dataContext = dataContext;
            _configuration = configuration;
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
                return BadRequest("Invalid");
            }

            string token = CreateToken(dbUser);
            return Ok(token);
        }

        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim("email", user.Email),
                new Claim("emri", user.Emri),
                new Claim("mbiemri", user.Mbiemri),
                new Claim("id", Convert.ToString(user.IdUser)),
                new Claim("role", user.Pozita)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: creds);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }


        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<User>>> Get()
        {
            return Ok(await _dataContext.Users.ToListAsync());
        }


        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<User>> Get(int id)
        {
            var u = await _dataContext.Users.FindAsync(id);
            if (u == null)
                return BadRequest("User not found!");
            return Ok(u);
        }


        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<User>>> AddUser(User u)
        {
            var dbUser = _dataContext.Users.Where(user => user.Email == u.Email).FirstOrDefault();

            if(dbUser != null)
            {
                return BadRequest("Useri ekziston me qit email!");
            }

            var sha = SHA256.Create();
            var asByteArrray = Encoding.Default.GetBytes(u.Password);
            var hashedPassword = sha.ComputeHash(asByteArrray);
            u.Password = Convert.ToBase64String(hashedPassword);



            //i marrim prej token
            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = u.Emri + " " + u.Mbiemri,
                Activity = "created User",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            
            _dataContext.Users.Add(u);
            await _dataContext.SaveChangesAsync();
            await ak.AddActivity(aktiviteti);
            return Ok(await _dataContext.Users.ToListAsync());
        }


        [HttpPut]
        [Authorize(Roles = "Admin")]
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

            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                ActivityOn = Convert.ToString(dbUser.IdUser),
                Activity = "edited User",
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Users.ToListAsync());
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<User>>> Delete(int id)
        {
            var dbUser = await _dataContext.Users.FindAsync(id);
            if (dbUser == null)
                return BadRequest("User not found!");

            string LoggedUserId = User.Claims.FirstOrDefault(c => c.Type == "id").Value;
            string LoggedUserEmri = User.Claims.FirstOrDefault(c => c.Type == "emri").Value;
            string LoggedUserMbiemri = User.Claims.FirstOrDefault(c => c.Type == "mbiemri").Value;


            ActivityLogUser aktiviteti = new ActivityLogUser
            {
                UseriLoggedId = LoggedUserId,
                UseriLoggedName = LoggedUserEmri + " " + LoggedUserMbiemri,
                Activity = "deleted User",
                ActivityOn = Convert.ToString(dbUser.IdUser),
                Ora = DateTime.Now
            };

            ActivityLogUserController ak = new ActivityLogUserController(_dataContext);


            
            _dataContext.Users.Remove(dbUser);
            await _dataContext.SaveChangesAsync();
            await ak.AddActivity(aktiviteti);

            return Ok(await _dataContext.Users.ToListAsync());
        }
    }
}
