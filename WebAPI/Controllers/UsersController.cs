using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using WebAPI.DataAccess.Services;
using WebAPI.Models.database;

namespace WebAPI.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "GET, PUT, POST, DELETE")]
    public class UsersController : ApiController
    {
        private UserService userService = new UserService();
        
        [Route("api/Users")]
        public IEnumerable<User> GetUsers()
        {
            return userService.GetList();
        }
        
        [ResponseType(typeof(User))]
        [Route("api/Users/{id}")]
        public async Task<IHttpActionResult> GetUser(int id)
        {
            User user = await userService.Get(id);

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [HttpPut]
        [ResponseType(typeof(void))]
        [Route("api/Users/{id}")]
        public async Task<IHttpActionResult> PutUser(int id, User user)
        {
            ModelState.Remove("Password");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.UserId)
            {
                return BadRequest();
            }
            
            var updatedUser = await userService.Put(user);
            if (updatedUser == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpPut]
        [ResponseType(typeof(User))]
        [Route("api/Users/resetpass/{id}/{newPassword}")]
        public async Task<IHttpActionResult> ResetPassword(int id, string newPassword)
        {
            if (string.IsNullOrEmpty(newPassword))
            {
                return BadRequest("no empty password is allowed.");
            }
            var updatedUser = await userService.ResetPassword(id, newPassword);
            if(updatedUser == null)
            {
                return NotFound();
            }
            return Ok(updatedUser);

        }

        // POST: api/Users
        [HttpPost]
        [ResponseType(typeof(User))]
        [Route("api/Users")]
        public async Task<IHttpActionResult> PostUser(User user)
        {
            ModelState.Remove("UserId");
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdUser = await userService.Post(user);
            if (createdUser == null)
            {
                ModelState.AddModelError("error", "username is already exist.");
                return BadRequest(ModelState);
            }
            return Ok(createdUser);
        }

        // DELETE: api/Users/5
        [HttpDelete]
        [ResponseType(typeof(User))]
        [Route("api/Users/{id}")]
        public async Task<IHttpActionResult> DeleteUser(int id)
        {
            var deletedUser = await userService.Delete(id);
            if (deletedUser == null)
            {
                return NotFound();
            }
            return Ok(deletedUser);
        }
    }
}