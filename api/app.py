from flask import Flask, render_template


app = Flask(__name__, static_folder='static', static_url_path='')

###############################
############ MAIN #############
###############################

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/timeline')
def timeline():
    return render_template('timeline.html')

@app.route('/resource')
def resource():
    return render_template('resource.html')

@app.route('/about/fenlunti')
def fenlunti():
    return render_template('fenlunti.html')

###############################
######## RUN TIME CODE ########
###############################
if __name__ == "__main__":
    app.run(debug=True)
