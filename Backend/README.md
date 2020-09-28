# Pratilipi Backend
This is django based web application which lays the framework for Pratilipi frontend application.

## Installation Instructions
Make Sure that you have `Python 3`, `virtualenv`, and `pip` installed. 
1. Clone the repository
   
    ```bash
        $ git clone https://github.com/ncp-project/Pratilipi.git
        $ cd Pratilipi/Backend 
    ```
2. Create a python 3 virtualenv, and activate the environment.
    ```bash
        $ virtualenv -p python3 .
        $ source bin/activate
    ```   
3. Install the project dependencies from `requirements.txt`
    ```bash
        $ pip install -r requirements.txt
    ```
### After Setting Up
Run ``source bin/activate`` inside the project repository and you can work with the django application as usual - 

* `python manage.py migrate` - set up database
* `python manage.py createsuperuser` - create admin user
* `python manage.py runserver`  - run the project locally