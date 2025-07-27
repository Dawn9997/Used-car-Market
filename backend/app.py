from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy

# ------------------------------
# Flask App Initialization
# ------------------------------
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:zhanghan998@localhost:5433/postgres'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# ------------------------------
# Car Model (Matches front-end fields)
# ------------------------------
class Car(db.Model):
    __tablename__ = 'cars'
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(50), nullable=False)
    model = db.Column(db.String(50), nullable=False)
    year = db.Column(db.Integer)
    price = db.Column(db.Float)
    mileage = db.Column(db.Integer)
    transmission = db.Column(db.String(50))
    fuel_type = db.Column(db.String(50))
    vin = db.Column(db.String(50), unique=True)
    image_url = db.Column(db.Text)
    location = db.Column(db.String(100))
    description = db.Column(db.Text)
    contact_info = db.Column(db.String(100))
    submitted_by = db.Column(db.String(50))
    approved = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "make": self.make,
            "model": self.model,
            "year": self.year,
            "price": self.price,
            "mileage": self.mileage,
            "transmission": self.transmission,
            "fuelType": self.fuel_type,
            "vin": self.vin,
            "imageUrl": self.image_url,
            "location": self.location,
            "description": self.description,
            "contactInfo": self.contact_info,
            "submittedBy": self.submitted_by,
            "approved": self.approved
        }

# ------------------------------
# User Model
# ------------------------------
class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username
        }

# ------------------------------
# Home Route (API status check)
# ------------------------------
@app.route('/')
def home():
    return "🚗 Used Car Marketplace API is running with PostgreSQL!"

# ------------------------------
# Car Routes (CRUD)
# ------------------------------

@app.route('/cars', methods=['GET'])
def get_all_cars():
    cars = Car.query.all()
    return jsonify({"status": "success", "data": [car.to_dict() for car in cars]}), 200

@app.route('/cars/<int:car_id>', methods=['GET'])
def get_car_by_id(car_id):
    car = Car.query.get(car_id)
    if car:
        return jsonify({"status": "success", "data": car.to_dict()}), 200
    return jsonify({"status": "error", "message": "Car not found"}), 404

@app.route('/cars', methods=['POST'])
def create_car():
    data = request.get_json()
    try:
        car = Car(
            make=data.get('make', ''),
            model=data.get('model', ''),
            year=data.get('year', 0),
            price=data.get('price', 0),
            mileage=data.get('mileage', 0),
            transmission=data.get('transmission', ''),
            fuel_type=data.get('fuelType', ''),
            vin=data.get('vin', ''),
            image_url=data.get('imageUrl', ''),
            location=data.get('location', ''),
            description=data.get('description', ''),
            contact_info=data.get('contactInfo', ''),
            submitted_by=data.get('submittedBy', 'Anonymous'),
            approved=data.get('approved', False)
        )
        db.session.add(car)
        db.session.commit()
        return jsonify({"status": "success", "data": car.to_dict()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"status": "error", "message": str(e)}), 400

@app.route('/cars/<int:car_id>', methods=['PUT'])
def update_car(car_id):
    car = Car.query.get(car_id)
    if not car:
        return jsonify({"status": "error", "message": "Car not found"}), 404
    data = request.get_json()

    # Update each field if present in request
    for key, value in data.items():
        if key == "fuelType":
            car.fuel_type = value
        elif key == "imageUrl":
            car.image_url = value
        elif key == "contactInfo":
            car.contact_info = value
        elif key == "submittedBy":
            car.submitted_by = value
        elif hasattr(car, key):
            setattr(car, key, value)

    db.session.commit()
    return jsonify({"status": "success", "data": car.to_dict()}), 200

@app.route('/cars/<int:car_id>', methods=['DELETE'])
def delete_car(car_id):
    car = Car.query.get(car_id)
    if not car:
        return jsonify({"status": "error", "message": "Car not found"}), 404
    db.session.delete(car)
    db.session.commit()
    return jsonify({"status": "success", "message": f"Car with id {car_id} deleted"}), 200

# ------------------------------
# User Routes
# ------------------------------

@app.route('/users', methods=['GET'])
def get_all_users():
    users = User.query.all()
    return jsonify({"status": "success", "data": [u.to_dict() for u in users]}), 200

@app.route('/users/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if user:
        return jsonify({"status": "success", "data": user.to_dict()}), 200
    return jsonify({"status": "error", "message": "User not found"}), 404

@app.route('/users', methods=['POST'])
def create_user():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"status": "error", "message": "Username and password are required"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"status": "error", "message": "Username already exists"}), 409

    user = User(username=username, password=password)
    db.session.add(user)
    db.session.commit()
    return jsonify({"status": "success", "data": user.to_dict()}), 201

@app.route('/users/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404

    data = request.get_json()
    if 'username' in data:
        user.username = data['username']
    if 'password' in data:
        user.password = data['password']

    db.session.commit()
    return jsonify({"status": "success", "data": user.to_dict()}), 200


@app.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"status": "error", "message": "User not found"}), 404
    db.session.delete(user)
    db.session.commit()
    return jsonify({"status": "success", "message": f"User with id {user_id} deleted"}), 200



# ✅ Add login endpoint (with admin check)
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"status": "error", "message": "Username and password required"}), 400

    user = User.query.filter_by(username=username, password=password).first()
    if not user:
        return jsonify({"status": "error", "message": "Invalid credentials"}), 401

    is_admin = (username == "admin")  # Hardcoded admin check

    return jsonify({
        "status": "success",
        "data": {
            "userId": user.id,
            "username": user.username,
            "isAdmin": is_admin
        }
    }), 200

# ✅ Admin approves a car listing
@app.route('/cars/<int:car_id>/approve', methods=['PUT'])
def approve_car(car_id):
    car = Car.query.get(car_id)
    if not car:
        return jsonify({"status": "error", "message": "Car not found"}), 404

    car.approved = True
    db.session.commit()

    return jsonify({
        "status": "success",
        "message": f"Car with id {car_id} approved"
    }), 200



# ✅ Get all unapproved car listings (for admin)
@app.route('/cars/pending', methods=['GET'])
def get_pending_cars():
    cars = Car.query.filter_by(approved=False).all()
    return jsonify({"status": "success", "data": [car.to_dict() for car in cars]}), 200


# ✅ Get all approved car listings
@app.route('/cars/approved', methods=['GET'])
def get_approved_cars():
    cars = Car.query.filter_by(approved=True).all()
    return jsonify({
        "status": "success",
        "data": [car.to_dict() for car in cars]
    }), 200

# ✅ Get car detail by ID
@app.route('/cars/<int:car_id>', methods=['GET'])
def get_car_detail(car_id):
    car = Car.query.get(car_id)
    if not car:
        return jsonify({"status": "error", "message": "Car not found"}), 404
    
    return jsonify({
        "status": "success",
        "data": car.to_dict()
    }), 200


# ------------------------------
# Run the Flask App
# ------------------------------
if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Auto-create tables if not exist
    app.run(debug=True, port=5000)







