// Create user for widgets database
db = db.getSiblingDB('admin');
db.auth('admin', 'password123');

db = db.getSiblingDB('widgets_db');
db.createUser({
  user: 'widgets_user',
  pwd: 'widgets_password',
  roles: [
    {
      role: 'readWrite',
      db: 'widgets_db'
    }
  ]
});

// Create widgets collection
db.createCollection('widgets');

// Insert sample widget
db.widgets.insertOne({
  type: 'text',
  text: 'Welcome to your widgets app!',
  createdAt: new Date(),
  updatedAt: new Date()
});