from flask import Blueprint, render_template, request, url_for
from werkzeug.utils import redirect

bp = Blueprint('main', __name__, url_prefix='/')


@bp.route('/pybo')
def hello_pybo():
    return 'Hello, Pybo!'

@bp.route('/')
def index():
    return render_template('index.html')
    # return 'Pybo index'

@bp.route('/question')
def question():
    # redirect : URL로 페이지를 이동
    # url_for : 라우팅 함수에 매핑되어 있는 URL을 리턴
    return redirect(url_for('question._list'))






@bp.route('/payment_cal')
def payment_cal():
    return render_template('payment_cal.html')

@bp.route('/calculator')
def calculator():
    return render_template('calculator.html')

@bp.route('/calculator/cal', methods=['POST'])
def calculate():
    num1 = float(request.form['num1'])
    num2 = float(request.form['num2'])
    operator = request.form['operator']

    if operator == '+':
        result = num1 + num2
    elif operator == '-':
        result = num1 - num2
    elif operator == '*':
        result = num1 * num2
    elif operator == '/':
        result = num1 / num2
    else:
        return "잘못된 연산자입니다."

    return render_template('calculator.html', result=result)
