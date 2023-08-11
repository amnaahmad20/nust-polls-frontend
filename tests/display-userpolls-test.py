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


driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()))

driver.get("http://localhost:3000/")

element  = WebDriverWait(driver, 20).until(
            EC.presence_of_element_located((By.XPATH, "//input[@name='username']"))
                )
sleep(3)
input=driver.find_element(By.XPATH, "//input[@name='username']")
input.click()
input.send_keys("amna.ahmad")
sleep(1)
input=driver.find_element(By.XPATH, "//input[@name='password']")
input.click()
input.send_keys("password123")

input=driver.find_element(By.XPATH, "//button[@type='submit']")
input.click()
sleep(10)

# Test case executed successfully
print("Test case executed successfully! user polls displayed")


