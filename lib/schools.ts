// Division I Schools Database
export interface SchoolData {
    name: string;
    city: string;
    state: string;
    conference?: string;
}

export const DIVISION_I_SCHOOLS: SchoolData[] = [
    // ACC
    { name: "Boston College", city: "Chestnut Hill", state: "MA", conference: "ACC" },
    { name: "Clemson University", city: "Clemson", state: "SC", conference: "ACC" },
    { name: "Duke University", city: "Durham", state: "NC", conference: "ACC" },
    { name: "Florida State University", city: "Tallahassee", state: "FL", conference: "ACC" },
    { name: "Georgia Institute of Technology", city: "Atlanta", state: "GA", conference: "ACC" },
    { name: "University of Louisville", city: "Louisville", state: "KY", conference: "ACC" },
    { name: "University of Miami", city: "Coral Gables", state: "FL", conference: "ACC" },
    { name: "University of North Carolina", city: "Chapel Hill", state: "NC", conference: "ACC" },
    { name: "NC State University", city: "Raleigh", state: "NC", conference: "ACC" },
    { name: "University of Notre Dame", city: "Notre Dame", state: "IN", conference: "ACC" },
    { name: "University of Pittsburgh", city: "Pittsburgh", state: "PA", conference: "ACC" },
    { name: "Syracuse University", city: "Syracuse", state: "NY", conference: "ACC" },
    { name: "University of Virginia", city: "Charlottesville", state: "VA", conference: "ACC" },
    { name: "Virginia Tech", city: "Blacksburg", state: "VA", conference: "ACC" },
    { name: "Wake Forest University", city: "Winston-Salem", state: "NC", conference: "ACC" },

    // Big Ten
    { name: "University of Illinois", city: "Champaign", state: "IL", conference: "Big Ten" },
    { name: "Indiana University", city: "Bloomington", state: "IN", conference: "Big Ten" },
    { name: "University of Iowa", city: "Iowa City", state: "IA", conference: "Big Ten" },
    { name: "University of Maryland", city: "College Park", state: "MD", conference: "Big Ten" },
    { name: "University of Michigan", city: "Ann Arbor", state: "MI", conference: "Big Ten" },
    { name: "Michigan State University", city: "East Lansing", state: "MI", conference: "Big Ten" },
    { name: "University of Minnesota", city: "Minneapolis", state: "MN", conference: "Big Ten" },
    { name: "University of Nebraska", city: "Lincoln", state: "NE", conference: "Big Ten" },
    { name: "Northwestern University", city: "Evanston", state: "IL", conference: "Big Ten" },
    { name: "Ohio State University", city: "Columbus", state: "OH", conference: "Big Ten" },
    { name: "Penn State University", city: "University Park", state: "PA", conference: "Big Ten" },
    { name: "Purdue University", city: "West Lafayette", state: "IN", conference: "Big Ten" },
    { name: "Rutgers University", city: "New Brunswick", state: "NJ", conference: "Big Ten" },
    { name: "University of Wisconsin", city: "Madison", state: "WI", conference: "Big Ten" },

    // Big 12
    { name: "Baylor University", city: "Waco", state: "TX", conference: "Big 12" },
    { name: "Iowa State University", city: "Ames", state: "IA", conference: "Big 12" },
    { name: "University of Kansas", city: "Lawrence", state: "KS", conference: "Big 12" },
    { name: "Kansas State University", city: "Manhattan", state: "KS", conference: "Big 12" },
    { name: "Oklahoma State University", city: "Stillwater", state: "OK", conference: "Big 12" },
    { name: "Texas Christian University", city: "Fort Worth", state: "TX", conference: "Big 12" },
    { name: "Texas Tech University", city: "Lubbock", state: "TX", conference: "Big 12" },
    { name: "University of West Virginia", city: "Morgantown", state: "WV", conference: "Big 12" },

    // Pac-12
    { name: "University of Arizona", city: "Tucson", state: "AZ", conference: "Pac-12" },
    { name: "Arizona State University", city: "Tempe", state: "AZ", conference: "Pac-12" },
    { name: "University of California, Berkeley", city: "Berkeley", state: "CA", conference: "Pac-12" },
    { name: "UCLA", city: "Los Angeles", state: "CA", conference: "Pac-12" },
    { name: "University of Colorado", city: "Boulder", state: "CO", conference: "Pac-12" },
    { name: "University of Oregon", city: "Eugene", state: "OR", conference: "Pac-12" },
    { name: "Oregon State University", city: "Corvallis", state: "OR", conference: "Pac-12" },
    { name: "University of Southern California", city: "Los Angeles", state: "CA", conference: "Pac-12" },
    { name: "Stanford University", city: "Stanford", state: "CA", conference: "Pac-12" },
    { name: "University of Utah", city: "Salt Lake City", state: "UT", conference: "Pac-12" },
    { name: "University of Washington", city: "Seattle", state: "WA", conference: "Pac-12" },
    { name: "Washington State University", city: "Pullman", state: "WA", conference: "Pac-12" },

    // SEC
    { name: "University of Alabama", city: "Tuscaloosa", state: "AL", conference: "SEC" },
    { name: "University of Arkansas", city: "Fayetteville", state: "AR", conference: "SEC" },
    { name: "Auburn University", city: "Auburn", state: "AL", conference: "SEC" },
    { name: "University of Florida", city: "Gainesville", state: "FL", conference: "SEC" },
    { name: "University of Georgia", city: "Athens", state: "GA", conference: "SEC" },
    { name: "University of Kentucky", city: "Lexington", state: "KY", conference: "SEC" },
    { name: "Louisiana State University", city: "Baton Rouge", state: "LA", conference: "SEC" },
    { name: "University of Mississippi", city: "Oxford", state: "MS", conference: "SEC" },
    { name: "Mississippi State University", city: "Starkville", state: "MS", conference: "SEC" },
    { name: "University of Missouri", city: "Columbia", state: "MO", conference: "SEC" },
    { name: "University of South Carolina", city: "Columbia", state: "SC", conference: "SEC" },
    { name: "University of Tennessee", city: "Knoxville", state: "TN", conference: "SEC" },
    { name: "Texas A&M University", city: "College Station", state: "TX", conference: "SEC" },
    { name: "Vanderbilt University", city: "Nashville", state: "TN", conference: "SEC" },

    // Other notable D1 schools
    { name: "Brigham Young University", city: "Provo", state: "UT" },
    { name: "University of Connecticut", city: "Storrs", state: "CT" },
    { name: "Georgetown University", city: "Washington", state: "DC" },
    { name: "Gonzaga University", city: "Spokane", state: "WA" },
    { name: "Marquette University", city: "Milwaukee", state: "WI" },
    { name: "Providence College", city: "Providence", state: "RI" },
    { name: "University of San Diego", city: "San Diego", state: "CA" },
    { name: "Villanova University", city: "Villanova", state: "PA" },
    { name: "Xavier University", city: "Cincinnati", state: "OH" },
];

export function searchSchools(query: string): SchoolData[] {
    const lowerQuery = query.toLowerCase();
    return DIVISION_I_SCHOOLS.filter(school =>
        school.name.toLowerCase().includes(lowerQuery) ||
        school.city.toLowerCase().includes(lowerQuery) ||
        school.state.toLowerCase().includes(lowerQuery)
    ).slice(0, 10); // Limit to top 10 results
}
