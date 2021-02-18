import { studyFields, searchTerms } from "./../constants";

/* --------------------------------- info ---------------------------------
Study Fields:
- BriefTitle
- BriefSummary 
- Condition
- Keyword
- EnrollmentCount
- LocationCity
- LocationCountry 
- MinimumAge
- MaximumAge
- StdAge
- OrgFullName 
- StartDate
- CompletionDate
*/

// gather keywords from constants.js and sort them to display for autocomplete
export const getKeywords = () => {
  const keywords = [...searchTerms];
  keywords.sort();
  return keywords;
};

// gather a subset of studies using user's search terms
export const getResponseFromSearch = async (searchTerms, minimum, maximum) => {
  const expr = encodeURIComponent(searchTerms);
  const fields = studyFields.join("%2C+");
  const baseURL = `https://clinicaltrials.gov/api/query/study_fields?expr=${expr}&fields=${fields}&fmt=json`;
  const ranks = `&min_rnk=${minimum}&max_rnk=${maximum}`;
  const data = await fetch(baseURL + ranks)
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .catch((error) => {
      return { StudyFieldsResponse: {}, error };
    });
  return data;
};

// break down api response into min rank, max rank, number of studies, and actual list of studies
export const getInfoFromResponse = (response) => {
  // destructure
  let {
    MinRank: minRank,
    MaxRank: maxRank,
    NStudiesFound: totalStudies,
    StudyFields: studies,
  } = response.StudyFieldsResponse;

  // reformat
  studies = (studies || []).map((item) => ({
    briefTitle: item.BriefTitle[0],
    briefSummary: item.BriefSummary[0],
    condition: item.Condition,
    keyword: item.Keyword,
    enrollmentCount: item.EnrollmentCount[0],
    locationCity: item.LocationCity[0],
    locationCountry: item.LocationCountry[0],
    minimumAge: item.MinimumAge[0],
    maximumAge: item.MaximumAge[0],
    stdAge: item.StdAge,
    organization: item.OrgFullName[0],
    startDate: item.StartDate[0],
    endDate: item.CompletionDate[0],
  }));

  // hand back to caller
  return { minRank, maxRank, totalStudies, studies };
};

// paginate data
export const paginateStudies = (studies, resultsPerPage) => {
  const splitStudies = [];
  for (let i = 0; i < studies.length; i += resultsPerPage) {
    splitStudies.push(studies.slice(i, i + resultsPerPage));
  }
  return splitStudies;
};
