import React, { useState, useEffect, useRef, useCallback } from 'react';
import './InfiniteScroll.css';

function InfiniteScroll() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1); // Start with page 1
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const observer = useRef();

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const newItems = await response.json();

      if (newItems.length === 0) {
        setHasMore(false);
      } else {
        setItems(prevItems => {
          const existingIds = new Set(prevItems.map(item => item.id));
          const uniqueNewItems = newItems.filter(item => !existingIds.has(item.id));
          return [...prevItems, ...uniqueNewItems];
        });
        setPage(prevPage => prevPage + 1);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError(err.message);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    if (hasMore && !loading && items.length === 0) {
      fetchData();
    }
  }, [fetchData, hasMore, loading, items.length]);

  const lastItemRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        console.log('Last item is visible, fetching more data...');
        fetchData();
      }
    });

    if (node) observer.current.observe(node);
  }, [loading, hasMore, fetchData]);

  return (
    <div className="InfiniteScroll">
      <h1>Infinite Scroll Example</h1>
      <div className="item-container">
        {items.map((item, index) => (
          <div
            className="item-card"
            key={item.id}
            ref={items.length === index + 1 ? lastItemRef : null}
          >
            <h3>{item.title} ({item.id})</h3>
            <p>User ID: {item.userId}</p>
            <p>{item.body.substring(0, 100)}...</p>
          </div>
        ))}
      </div>
      {loading && <p className="loading">Loading more items...</p>}
      {error && <p className="error">Error: {error}</p>}
      {!loading && !hasMore && items.length > 0 && <p className="end-message">You've reached the end!</p>}
      {!loading && !hasMore && items.length === 0 && !error && <p className="end-message">No items to display.</p>}
    </div>
  );
}

export default InfiniteScroll;