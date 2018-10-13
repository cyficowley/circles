import  requests
from bs4 import BeautifulSoup
 
#USER_AGENT = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36'}
 
 
def fetch_results(search_term, number_results, language_code):
    assert isinstance(search_term, str), 'Search term must be a string'
    assert isinstance(number_results, int), 'Number of results must be an integer'
    escaped_search_term = search_term.replace(' ', '+')
 
    google_url = 'https://www.google.com/search?q={}&num={}&hl={}'.format(escaped_search_term, number_results, language_code)
    #response = requests.get(google_url, headers=USER_AGENT)
    response = requests.get(google_url)
    response.raise_for_status()
 
    return search_term, response.text

def parse_results(html):
    soup = BeautifulSoup(html, 'html.parser')
    urlList = []
    for URL in soup.find_all('cite'):
        urlList.append(URL.text)
    return urlList
 
if __name__ == '__main__':
    keyword, html = fetch_results('Ian Carrasco', 20, 'en')
    print(parse_results(html))