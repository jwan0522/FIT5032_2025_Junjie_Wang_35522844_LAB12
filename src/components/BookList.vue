<template>
  <div>
    <h1>Books with ISBN > 1000</h1>
    

    <div class="query-controls">
      <div>
        <label for="queryType">Query Type:</label>
        <select v-model="queryType" id="queryType">
          <option value="basic">Basic Query (ISBN > 1000)</option>
          <option value="ordered">Ordered Query (Sort by ISBN)</option>
          <option value="limited">Limited Query (Show only 2)</option>
          <option value="combined">Combined Query (ISBN > 1000 + Sort + Limit)</option>
        </select>
        <button @click="executeQuery">Execute Query</button>
      </div>
    </div>
    

    <ul class="book-list">
      <li v-for="book in books" :key="book.id" class="book-item">
        <div>
          <span class="book-name">{{ book.name }}</span> - 
          <span class="book-isbn">ISBN: {{ book.isbn }}</span>
        </div>
        <div class="book-actions">
          <!-- Edit Mode -->
          <div v-if="editingBook && editingBook.id === book.id" class="edit-form">
            <input v-model="editingBook.name" placeholder="Book Name" />
            <input v-model.number="editingBook.isbn" type="number" placeholder="ISBN" />
            <button @click="updateBook(book.id)">Save</button>
            <button @click="cancelEdit()">Cancel</button>
          </div>

          <div v-else>
            <button @click="editBook(book)">Edit</button>
            <button @click="deleteBook(book.id)">Delete</button>
          </div>
        </div>
      </li>
    </ul>
    

    <div class="query-info">
      <p>Current Query: {{ currentQueryDescription }}</p>
      <p>Result Count: {{ books.length }}</p>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import db from '../firebase/init.js'
import { collection, query, where, getDocs, orderBy, limit, doc, updateDoc, deleteDoc } from 'firebase/firestore'

export default {
  setup() {
    const books = ref([]);
    const editingBook = ref(null);
    const queryType = ref('basic');
    const currentQueryDescription = ref('Basic Query (ISBN > 1000)');

    // Basic Query - ISBN > 1000
    const basicQuery = async () => {
      try {
        const q = query(collection(db, 'books'), where('isbn', '>', 1000));
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
        currentQueryDescription.value = 'Basic Query (ISBN > 1000)';
      } catch (error) {
        console.error('Error fetching books: ', error);
      }
    };

    // Ordered Query - Sort by ISBN
    const orderedQuery = async () => {
      try {
        const q = query(collection(db, 'books'), orderBy('isbn', 'desc'));
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
        currentQueryDescription.value = 'Ordered Query (Sorted by ISBN descending)';
      } catch (error) {
        console.error('Error fetching ordered books: ', error);
      }
    };

    // Limited Query - Show only 2 books
    const limitedQuery = async () => {
      try {
        const q = query(collection(db, 'books'), limit(2));
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
        currentQueryDescription.value = 'Limited Query (Show only 2 books)';
      } catch (error) {
        console.error('Error fetching limited books: ', error);
      }
    };


    const combinedQuery = async () => {
      try {
        const q = query(
          collection(db, 'books'), 
          where('isbn', '>', 1000),
          orderBy('isbn', 'desc'),
          limit(2)
        );
        const querySnapshot = await getDocs(q);
        const booksArray = [];
        querySnapshot.forEach((doc) => {
          booksArray.push({ id: doc.id, ...doc.data() });
        });
        books.value = booksArray;
        currentQueryDescription.value = 'Combined Query (ISBN > 1000 + Descending Sort + Limit 2)';
      } catch (error) {
        console.error('Error fetching combined query books: ', error);
      }
    };

    // Execute Query
    const executeQuery = () => {
      switch (queryType.value) {
        case 'basic':
          basicQuery();
          break;
        case 'ordered':
          orderedQuery();
          break;
        case 'limited':
          limitedQuery();
          break;
        case 'combined':
          combinedQuery();
          break;
        default:
          basicQuery();
      }
    };

    // Edit Book
    const editBook = (book) => {
      editingBook.value = { ...book };
    };

    // Cancel Edit
    const cancelEdit = () => {
      editingBook.value = null;
    };

    // Update Book
    const updateBook = async (id) => {
      try {
        if (!editingBook.value) return;
        
        const bookRef = doc(db, 'books', id);
        await updateDoc(bookRef, {
          name: editingBook.value.name,
          isbn: editingBook.value.isbn
        });
        
        // Update local data
        const index = books.value.findIndex(book => book.id === id);
        if (index !== -1) {
          books.value[index] = { ...editingBook.value };
        }
        
        editingBook.value = null;
        alert('Book updated successfully!');
      } catch (error) {
        console.error('Error updating book: ', error);
        alert('Update failed: ' + error.message);
      }
    };

    // Delete Book
    const deleteBook = async (id) => {
      try {
        if (confirm('Are you sure you want to delete this book?')) {
          await deleteDoc(doc(db, 'books', id));
          books.value = books.value.filter(book => book.id !== id);
          alert('Book deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting book: ', error);
        alert('Delete failed: ' + error.message);
      }
    };

    onMounted(() => {
      basicQuery();
    });

    return {
      books,
      editingBook,
      queryType,
      currentQueryDescription,
      executeQuery,
      editBook,
      cancelEdit,
      updateBook,
      deleteBook
    };
  }
}
</script>

<style scoped>
.query-controls {
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border-radius: 5px;
}

.query-controls select {
  margin-right: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.query-controls button {
  padding: 5px 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.query-controls button:hover {
  background-color: #45a049;
}

.book-list {
  list-style-type: none;
  padding: 0;
}

.book-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
}

.book-name {
  font-weight: bold;
}

.book-isbn {
  color: #666;
}

.book-actions button {
  margin-left: 5px;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.book-actions button:first-child {
  background-color: #2196F3;
  color: white;
}

.book-actions button:last-child {
  background-color: #f44336;
  color: white;
}

.edit-form {
  display: flex;
  gap: 5px;
}

.edit-form input {
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.query-info {
  margin-top: 20px;
  padding: 10px;
  background-color: #e9f7ef;
  border-radius: 5px;
  font-size: 0.9em;
}
</style>