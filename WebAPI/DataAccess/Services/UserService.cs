using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using WebAPI.Helper;
using WebAPI.Models.database;

namespace WebAPI.DataAccess.Services
{
    public class UserService : IContextService<User>
    {
        PasswordHelper passwordHelper;
        public UserService()
        {
            passwordHelper = new PasswordHelper();
        }
        public async Task<User> Delete(int id)
        {
            using (var db = new AccountContext())
            {
                User user = await db.Users.FindAsync(id);
                if (user == null)
                {
                    return null;
                }

                db.Users.Remove(user);
                await db.SaveChangesAsync();
                return user;
            }
        }

        public async Task<User> Get(int id)
        {
            using (var db = new AccountContext())
            {
                return await db.Users.FindAsync(id);
            }
        }

        public IEnumerable<User> GetList()
        {
            using (var db = new AccountContext())
            {
                return db.Users.ToList();
            }
        }

        public async Task<User> Post(User user)
        {
            using (var db = new AccountContext())
            {
                if(!await db.Users.AnyAsync(x => x.Username == user.Username))
                {
                    user.Password = getHashedPassword(user.Password);
                    db.Users.Add(user);
                    await db.SaveChangesAsync();

                    return user;
                }
                return null;
            }
        }

        public async Task<User> Put(User user)
        {
            using (var db = new AccountContext())
            {
                db.Entry(user).State = EntityState.Modified;

                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(user.UserId))
                    {
                        return null;
                    }
                    else
                    {
                        throw;
                    }
                }

                return user;
            }
        }

        public async Task<User> ResetPassword(int id, string newPassword)
        {
            using (var db = new AccountContext())
            {
                if (!UserExists(id))
                {
                    return null;
                }
                var user = await db.Users.FindAsync(id);
                user.Password = getHashedPassword(newPassword);
                db.Entry(user).State = EntityState.Modified;

                try
                {
                    await db.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!UserExists(user.UserId))
                    {
                        return null;
                    }
                    else
                    {
                        throw;
                    }
                }

                return user;
            }
        }

        private bool UserExists(int id)
        {
            using (var db = new AccountContext())
            {
                return db.Users.Count(e => e.UserId == id) > 0;
            }
        }

        private string getHashedPassword(string password)
        {
            string salt = passwordHelper.CreateSalt(10);
            string hashedPassword = passwordHelper.GenerateSHA256Hash(password, salt);
            return string.Concat(salt,hashedPassword);
        }
    }
}