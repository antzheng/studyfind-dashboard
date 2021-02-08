import { studyFields, searchTerms } from "./constants";

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

// gather keywords from constants.js and shuffle them to display for autocomplete
export const getKeywords = () => {
  const keywords = [...searchTerms];
  for (let i = keywords.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = keywords[i];
    keywords[i] = keywords[j];
    keywords[j] = temp;
  }
  return keywords;
};

// gather a subset of studies using user's search terms
export const getResponseFromSearch = async (searchTerms, minimum, maximum) => {
  const expr = encodeURIComponent(searchTerms);
  const fields = studyFields.join("%2C+");
  const baseURL = `https://clinicaltrials.gov/api/query/study_fields?expr=${expr}&fields=${fields}&fmt=json`;
  const ranks = `&min_rnk=${minimum}&max_rnk=${maximum}`;
  const response = await fetch(baseURL + ranks);
  const data = await response.json();
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
  return { minRank, maxRank, totalStudies, studies: studies };
};

// paginate data
export const paginateStudies = (studies, resultsPerPage) => {
  const splitStudies = [];
  for (let i = 0; i < studies.length; i += resultsPerPage) {
    splitStudies.push(studies.slice(i, i + resultsPerPage));
  }
  return splitStudies;
};
