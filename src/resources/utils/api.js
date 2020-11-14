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
