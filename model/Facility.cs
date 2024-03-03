using System.Xml.Serialization;

namespace innovate2024.model
{
    public class Facility
    {
        public int id {get; set;}
        public int coid {get; set;}
        public string name {get; set;}
        public string timeZone {get; set;}
        public string utcoffset {get; set;}
        public string description {get; set;}
        public string emrMnem {get; set;}
        public string emrName {get; set;}
        public bool facilityStatus {get; set;}
        public string address1 {get; set;}
        public string city {get; set;}
        public string state {get; set;}
        public string zip {get; set;} //set as string, not int to handle "35758-041" for example
        public string companyName {get; set;}
        public string divMnem {get; set;}
        public string divName {get; set;}
        public string networkMeditech {get; set;}
        public double latitude {get; set;}
        public double longitude {get; set;}
    }
}