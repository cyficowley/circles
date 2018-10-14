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
    assert html != None, 'input html cannot be of Nonetype'
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

    facebookUrl = None
    twitterUrl = None
    githubUrl = None
    linkedinUrl = None

    facebookImage = None
    twitterImage = None
    githubImage = None
    linkedinImage = None

    if len(facebookList) > 0:
        facebookUrl = facebookList[0]
        facebookHtml = requests.get(facebookUrl).content
        if facebookHtml != None:
            facebookSoup = BeautifulSoup(facebookHtml, 'html.parser')
            facebookImageTag = facebookSoup.find('div', {"class": "_1nv3 _1nv5 profilePicThumb"})
            if facebookImageTag is None:
                facebookImageTag = facebookSoup.find('div', {"class": "_4jhq"})
            if facebookImageTag != None:
                facebookImage = facebookImageTag.img['src']

    if len(twitterList) > 0:
        twitterUrl = twitterList[0]
        twitterHtml = requests.get(twitterUrl).content
        if twitterHtml != None:
            twitterSoup = BeautifulSoup(twitterHtml, 'html.parser')
            twitterImageTag = twitterSoup.find('div', {"class": "ProfileAvatar"})
            if twitterImageTag != None:
                twitterImage = twitterImageTag.img['src']

    if len(githubList) > 0:
        
        githubUrl = githubList[0]
        githubHtml = requests.get(githubUrl).content    
        if githubHtml != None: 
            githubSoup = BeautifulSoup(githubHtml, 'html.parser')
            githubImageTag= githubSoup.find_all('a', {"class" : "u-photo d-block position-relative"})
            if len(githubImageTag) > 0:
                githubImageTag = githubImageTag[0]
                githubImage = githubImageTag.img['src']
    if len(linkedinList) > 0:
        linkedinUrl = linkedinList[0]

    accountInfo = {"Facebook" : [facebookUrl, facebookImage],
                    "Twitter" : [twitterUrl, twitterImage],
                    "Github" : [githubUrl, githubImage],
                    "Linkedin" : [linkedinUrl, linkedinImage]}
    return accountInfo

def scrape(search_term):
    number_results = 20
    language_code = 'en'
    keyword, html = fetch_results(search_term, number_results, language_code)
    return parse_results(html)

