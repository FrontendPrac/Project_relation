import styled, { keyframes } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { clickPost, getPosts } from '../redux/modules/postModule';
import { authService } from '../firebase';

const boxFade = keyframes`
  50% { // 50% -> 정해둔 초의 50%가 지났을 때 중괄호 안의 코드를 실행
    opacity: 50%; // 불투명도
  }
`;

function PostList() {
  const navigate = useNavigate();
  const param = useParams();
  const globalPostData = useSelector((state) => state.postModule.posts);

  const postItemData = globalPostData.filter(
    (item) => item.category === param.id
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const onClickPost = async (event) => {
    const eventPost = globalPostData.filter(
      (post) => post.id === event.target.id
    );
    const eventPostCounter = eventPost[0].clickCounter;
    dispatch(
      clickPost({ postId: event.target.id, eventPostCounter: eventPostCounter })
    );
    navigate(`/post/${event.target.id}`);
  };
  const onClickForm = () => {
    if (!authService.currentUser) {
      alert('로그인을 해주세요.');
      return false;
    }
    navigate(`/postform`);
  };

  return (
    <div>
      <StItemList>
        <StListName>{param.id}</StListName>
        <button onClick={onClickForm}>포스트작성</button>
        {postItemData.map((item) => (
          // 아래의 key는 id와 겹치지 않게 하기 위해 +1
          <StItem key={item.id + 1}>
            <div>
              <div>작성자 : {item.creator}</div>
              <StItemTitle>제목 : {item.title}</StItemTitle>
              <button onClick={onClickPost} id={item.id}>
                자세히보기
              </button>
              <StPostDate>
                {new Date(item.createAt + 9 * 60 * 60 * 1000).toLocaleString(
                  'ko-KR',
                  {
                    timeZone: 'UTC',
                  }
                )}
              </StPostDate>
            </div>
          </StItem>
        ))}
      </StItemList>
    </div>
  );
}
export default PostList;

const StListName = styled.div`
  margin: 20px;
  font-size: 30px;
  & {
    animation: ${boxFade} 1s step-end infinite; // ease-in-out infinite : 무한 alternate
  }
`;
const StItemList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  @media screen and (max-width: 768px) {
    padding-top: 90px;
  }
`;
const StItem = styled.div`
  border: 3px solid black;
  background-size: 380px 240px;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 150px;
  text-align: center;
  margin: 10px 0px 10px 0px;
  @media screen and (min-width: 800px) {
    background-size: 500px 280px;
    width: 500px;
    height: 150px;
  }
`;

const StItemTitle = styled.div`
  background-color: white;
  margin: 10px 30px 10px 30px;
`;
const StPostDate = styled.div`
  margin-top: 10px;
`;
