

from requests import get
from pprint import pprint

# study fields we want included in the results
studyFields = "%2C+".join([
    'BriefTitle',
    'BriefSummary',
    'Condition',
    'Keyword',
    'EnrollmentCount',
    'LocationCity',
    'LocationCountry',
    'MinimumAge',
    'MaximumAge',
    'StdAge',
    'OrgFullName',
    'StartDate',
    'CompletionDate'
])

# base url
baseURL = (f'https://clinicaltrials.gov/api/query/study_fields?'
           f'expr=&fields={studyFields}&fmt=json')


# min and max rank for api call
minimum = 1
maximum = 1000


# current results
results = get(f"{baseURL}&min_rnk={minimum}&max_rnk={maximum}").json()['StudyFieldsResponse']


# keywords and conditions
searchTerms = set()


# continually retrive 1000 results at a time until end
while results['NStudiesReturned'] > 0:
    studies = results['StudyFields']
    for study in studies:
        for term in study['Condition']:
            searchTerms.add(term.lower())
    print(f'done with scraping studies {minimum}-{maximum}, '
          f'found {results["NStudiesReturned"]}')
    minimum += 1000
    maximum += 1000
    results = get(f"{baseURL}&min_rnk={minimum}&max_rnk={maximum}").json()['StudyFieldsResponse']
    

# debugging
print('done with scraping')




















