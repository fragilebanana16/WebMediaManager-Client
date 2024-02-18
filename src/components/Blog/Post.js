import {Link} from "react-router-dom";
import styled from "styled-components";

export default function Post({_id,title,summary,cover,content,createdAt,author}) {

  return (
    <Container>
    <div className="post">
      <div className="image">
        <Link to={`/post/${_id}`}>
          <img src={'http://localhost:3001/'+cover} alt=""/>
        </Link>
      </div>
      <div className="texts">
        <Link to={`/post/${_id}`}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <time>{new Date(createdAt).toLocaleString()}</time>
          <a className="author">{author}</a>
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
    </Container>

  );
}
const Container = styled.div`
div.post{
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: 20px;
    margin-bottom: 30px;
}

h2{
  width: 550px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.summary {
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

div.post div.texts h2{
    margin:0;
    font-size: 1.6rem;
}
div.post div.texts a{
    text-decoration:none;
    color: inherit;
}
div.post p.info{
    margin:4px 0;
    color: #888;
    font-size:1rem;
    font-weight: bold;
    display: flex;
    gap: 10px;
}
div.post p.info a.author{
    color:#333;
}
div.post p.summary{
    margin:10px 0;
    line-height: 1.8rem;
}

div.image{
    max-height:300px;
    display: flex;
    overflow:hidden;
}
`;
