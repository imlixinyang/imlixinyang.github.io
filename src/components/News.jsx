import config from '../data/config.json'
import './News.css'

function News() {
  return (
    <section className="news-section" id="news">
      <div className="news-inner">
        <div className="news-title">[+] News</div>
        <div className="news-list">
          {config.news.map((item, i) => (
            <div key={i} className={`news-item ${item.highlight ? 'news-item-highlight' : ''}`}>
              <span className="news-date">{item.date}</span>
              <span className="news-text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default News
