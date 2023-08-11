from shutil import which
from selenium import webdriver
from selenium.webdriver.edge.options import Options
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from time import sleep

chrome_options=Options()
# Create a WebDriver instance
driver = webdriver.Chrome()

# Navigate to the desired page
driver.get("http://localhost:3000/student")

# Find a single element by class name
element = driver.find_element(By.NAME, "logout")
# Check if the element is displayed
if element.is_displayed():
    print("Element is visible.")
else:
    print("Element is not visible.")
# Close the browser
driver.quit()




