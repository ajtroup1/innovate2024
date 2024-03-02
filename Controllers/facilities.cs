using innovate2024.model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using innovate2024;

namespace MyApp.Namespace
{
    [Route("api/[controller]")]
    [ApiController]
    public class facilities : ControllerBase
    {
        private readonly string cs;

        public facilities(){
            cs = new ConnectionString().cs;
        }

        // GET: api/<facilities>
        [HttpGet]
        public List<Facility> Get()
        {
            List<Facility> facilities = new List<Facility>();

            try
            {
                using (MySqlConnection connection = new MySqlConnection(cs))
                {
                    connection.Open();
                    using (MySqlCommand command = new MySqlCommand("SELECT * FROM facilities", connection))
                    {
                        using (MySqlDataReader reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                facilities.Add(new Facility
                                {
                                    id = Convert.ToInt32(reader["facility_id"]),
                                    coid = Convert.ToInt32(reader["facility_id"]),
                                    name = Convert.ToString(reader["facility_name"]),
                                    timeZone = Convert.ToString(reader["timezone"]),
                                    utcoffset = Convert.ToString(reader["tz_utc_offset"]),
                                    description = Convert.ToString(reader["tz_description"]),
                                    emrMnem = Convert.ToString(reader["emr_mnem"]),
                                    emrName = Convert.ToString(reader["emr_name"]),
                                    facilityStatus = Convert.ToBoolean(reader["facility_status"]),
                                    address1 = Convert.ToString(reader["facility_address1"]),
                                    city = Convert.ToString(reader["facility_city"]),
                                    state = Convert.ToString(reader["facility_state"]),
                                    zip = Convert.ToString(reader["facility_zip"]),
                                    companyName = Convert.ToString(reader["company_name"]),
                                    divMnem = Convert.ToString(reader["division_mnem"]),
                                    divName = Convert.ToString(reader["division_name"]),
                                    networkMeditech = Convert.ToString(reader["network_meditech_network"])
                                    // Add other properties as needed
                                });
                            }
                        }
                    }
                    connection.Close();
                }

                return facilities;
            }
            catch (Exception ex)
            {
                // Log the exception details (you can replace Console.WriteLine with your logging mechanism)
                Console.WriteLine($"Error in GetAllGames: {ex.Message}");

                // Return an empty list or handle the error appropriately
                return new List<Facility>();
            }
        }
        

        // GET api/<facilities>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<facilities>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<facilities>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<facilities>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
