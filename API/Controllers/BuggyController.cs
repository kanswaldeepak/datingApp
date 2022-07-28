using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseController
    {
        private readonly DataContext _context;

        public BuggyController(DataContext dbContext)
        {
            _context = dbContext;
        }

        [Authorize]
        [HttpGet("auth")]
        public ActionResult<string> GetSecret() 
        { 
            return "Secret Error";
        }

        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound() 
        { 
            var result = _context.Users.Find(-1);
            
            if(result==null) return NotFound();

            return Ok(result);
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError() 
        { 
            var result = _context.Users.Find(-1);

            var thingToReturn = result.ToString();
            
            return thingToReturn;
        }



        [HttpGet("bad-request")]
        public ActionResult<string> GetBadRequest() 
        { 
            return BadRequest("This is Bad Request");
        }
        
    }
}   