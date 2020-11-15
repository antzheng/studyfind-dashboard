// fetches 100 studies from the api and simplifies each study into keywords/description/title
export const getFullStudies = async () => {
  const response = await fetch(
    "https://clinicaltrials.gov/api/query/full_studies?expr=heart+attack&fmt=json&max_rnk=100"
  );
  const data = await response.json();
  return data.FullStudiesResponse.FullStudies.map((data) => ({
    keywords: (
      data.Study.ProtocolSection.ConditionsModule.KeywordList?.Keyword ?? []
    ).concat(
      data.Study.ProtocolSection.ConditionsModule.ConditionList?.Condition ?? []
    ),
    description: data.Study.ProtocolSection.DescriptionModule.BriefSummary,
    title: data.Study.ProtocolSection.IdentificationModule.BriefTitle,
  }));
};

// using the simplified data from getFullStudies, returns a list of unique keywords
export const getKeywordsFromStudies = (studies) => {
  const allKeywords = [];
  studies.forEach((study) =>
    allKeywords.push(...study.keywords.map((word) => word.toLowerCase()))
  );
  return Array.from(new Set(allKeywords));
};

// given searchTerms, return all studies that match/start with terms
export const getStudiesFromSearch = (studies, searchTerms) => {
  return studies.filter(({ keywords }) =>
    keywords.some((term) =>
      term.toLowerCase().startsWith(searchTerms.toLowerCase())
    )
  );
};

// split studies in matrix for multiple pages of results
export const splitStudiesIntoPages = (studies, resultsPerPage) => {
  const splitStudies = [];
  for (let i = 0; i < studies.length; i += resultsPerPage) {
    splitStudies.push(studies.slice(i, i + resultsPerPage));
  }
  return splitStudies;
};
