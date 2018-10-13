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

    facebookList = []
    twitterList = []
    githubList = []
    linkedinList = []

    for url in urlList:
        if "facebook.com" in url:
            if "/public/" not in url:
                facebookList.append(url)
        elif "twitter.com" in url:
            twitterList.append(url)
        elif "linkedin.com" in url:
            linkedinList.append(url)
        elif "github.com" in url:
            githubList.append(url)
    
    accountUrls = [{"Facebook" : facebookList}, {"Twitter" : twitterList}, {"Github" : githubList}, {"Linkedin" : linkedinList}]

    # extract images from facebook links

    for url in facebookList:
        r = requests.get(url)
        facebookHtml = r.content
        facebookSoup = BeautifulSoup(facebookHtml, 'html.parser')
        facebookImage = facebookSoup.find('div', {"class": "_1nv3 _1nv5 profilePicThumb"}).img['src']
        #return facebookImage
    #return accountUrls

    for url in twitterList:
        r = requests.get(url)
        twitterHtml = r.content
        twitterSoup = BeautifulSoup(twitterHtml, 'html.parser')
        twitterImage = twitterSoup.find('div', {"class": "ProfileAvatar"}).img['src']
        print(twitterImage)
    return
 
if __name__ == '__main__':
    keyword, html = fetch_results('Shane Folden', 20, 'en')
    print(parse_results(html))