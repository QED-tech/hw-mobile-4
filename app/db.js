import * as SQLite from 'expo-sqlite';

let db;

export const addToCart = async (product) => {
  try {
    if (!db) {
      throw new Error('Database is not initialized');
    }

    return await db.runAsync(
      'INSERT INTO cart (title, price, description) VALUES (?, ?, ?)',
      product.title,
      product.price,
      product.description
    );
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const getCartItems = async () => {
  try {
    if (!db) {
      throw new Error('Database is not initialized');
    }

    return await db.getAllAsync('SELECT * FROM cart');
  } catch (error) {
    console.error('Error fetching cart items:', error);
    throw error;
  }
};

export const deleteCartItem = async (id) => {
  try {
    if (!db) {
      throw new Error('Database is not initialized');
    }

    return await db.runAsync(
      'DELETE FROM cart WHERE id = ?',
      id
    );
  } catch (error) {
    console.error('Error deleting cart item:', error);
    throw error;
  }
};

export const clearCart = async () => {
  try {
    if (!db) {
      throw new Error('Database is not initialized');
    }

    return await db.runAsync('DELETE FROM cart');
  } catch (error) {
    console.error('Error clearing the cart:', error);
    throw error;
  }
};

export const migration = async () => {
  try {
    db = SQLite.openDatabaseSync('cart');

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS cart (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        price REAL,
        description TEXT
      );
    `);

    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Failed to initialize database:', error);
  }
};