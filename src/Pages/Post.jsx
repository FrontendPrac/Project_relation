import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import backButton from '../img/x.png';
import CommentList from '../components/CommentList';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getComment } from '../redux/modules/commentModule';
import { deletePost } from '../redux/modules/postModule';
import { authService } from '../firebase';
import nullImage from '../img/null-image.png';

function Post() {
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getComment(postItemData.id));
  }, []);

  const globalPostData = useSelector((state) => state.postModule.posts);
  const globalComment = useSelector((state) => state.commentModule.comments);
  const onClickToggle = () => {
    setToggle(!toggle);
  };
  const param = useParams();
  const navigate = useNavigate();

  const postItemData = globalPostData.find((item) => item.id === param.id);

  const onClickBack = () => {
    window.history.back();
  };
  const onClickDeletePost = () => {
    if (postItemData.userUID !== authService?.currentUser?.uid) {
      alert('로그인을 해주세요.');
      return;
    }
    if (window.confirm('정말 삭제하시겠습니까?')) {
      dispatch(deletePost({ postId: param.id }));
      alert('삭제되었습니다.');
      navigate(`/${postItemData.category}`);
    }
  };
  const onClickPostFormModify = () => {
    if (postItemData.userUID !== authService?.currentUser?.uid) {
      alert('로그인을 해주세요.');
      return;
    }
    navigate(`/postmodify/${param.id}`);
  };

  return (
    <div>
      <StPost>
        <StPostHeader>
          <div>조회수 : {postItemData.clickCounter}</div>
          <div>작성자 : {postItemData.creator}</div>
          <StButtonWrap>
            <button
              onClick={onClickBack}
              width={50}
              height={50}
              src={backButton}
              alt="x-btn"
            >
              뒤로가기
            </button>
          </StButtonWrap>
          <StTitle>{postItemData.title}</StTitle>
          {postItemData.attachmentUrl ? (
            <StImage src={postItemData.attachmentUrl} alt="img" />
          ) : (
            <StImage src={nullImage} />
          )}
        </StPostHeader>
        <StBody>{postItemData.body}</StBody>
        {postItemData.userUID === authService?.currentUser?.uid ? (
          <div>
            <button onClick={onClickPostFormModify}>수정</button>
            <button onClick={onClickDeletePost}>삭제</button>
          </div>
        ) : null}
        <StBtn>
          <button onClick={onClickToggle}>
            {toggle ? '댓글 닫기' : '댓글 열기'} ({globalComment.length}개)
          </button>
        </StBtn>
        <StToggle>
          {toggle ? <CommentList postId={postItemData.id} /> : null}
        </StToggle>
      </StPost>
    </div>
  );
}
export default Post;

const StPostHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StPost = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 10% 0 10%;
  @media screen and (max-width: 768px) {
    padding-top: 100px;
    margin: auto;
    width: 90%;
  }
`;
const StButtonWrap = styled.div`
  margin: 10px;
  & > button:hover {
    cursor: pointer;
  }
`;
const StTitle = styled.div`
  text-align: center;
  background-color: #828282;
  color: white;
  margin: 10px;
  padding: 10px;
  max-width: 70%;
  width: 400px;
`;
const StImage = styled.img`
  width: 50%;
`;
const StBody = styled.div`
  border: 3px solid black;
  margin: 10px;
  padding: 10px;
  height: 300px;
  max-width: 80%;
  width: 500px;
`;
const StBtn = styled.div`
  margin: 5px;
`;
const StToggle = styled.div`
  margin: 5px;
`;
