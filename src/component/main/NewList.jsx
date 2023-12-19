import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import MainAxios from "../../axios/MainAxios";
import Img from "../../images/LogoSymbol_color.png";

const Container = styled.div`
  /* border: 3px solid black; */
  height: 80%;
  width: 100%;
  margin-top: 3%;
`;

const Contents = styled.div`
  width: 100%;
  height: 30vh;
`;

const Content = styled.div`
  border-radius: 20px;
  margin: 0 auto;
  width: 90%;
  height: 80%;
  background-image: ${(props) => `url(${props.imagePath})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  overflow: hidden;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .text {
    font-size: 1.3rem;
    font-weight: 900;
    line-height: 0;
  }
`;

const CatouselSlider = () => {
  const usenavigate = useNavigate();
  // 백엔드의 리스트 데이터 저장
  const [list, setList] = useState([]); // 상태로 list 선언

  // 해당 링크로 이동
  const onClick = (id) => {
    // 임시
    usenavigate(`/music-info/${id}`);
  };

  // 리스트 : 백엔드에서 가져올것.
  useEffect(() => {
    const getList = async () => {
      const res = await MainAxios.notLoginNewList();
      console.log("리스트 데이터", res);
      if (res.status === 200) {
        // 내림차순으로 정렬

        setList(res.data);
        console.log("list = res.data", res.data);
      }
    };
    getList();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    // slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    // autoplaySpeed: ,

    // break 포인트는 미디어쿼리랑 동일한 역할을 한다.
    responsive: [
      {
        breakpoint: 768, // 화면 크기가 768px 이하일 때
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 9999, // 화면 크기가 9999px 이하일 때 (무제한)
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <Container>
      <Slider {...settings}>
        {list.map((data, index) => (
          <Contents key={index}>
            <Content
              onDoubleClick={() => onClick(data.musicDTO.id)}
              imagePath={data.musicDTO.thumbnailImage}
            ></Content>

            <Text>
              {/* <p className="text">{data.musicDTO.releaseDate}</p> */}
              <p className="text">{data.userResDto.userNickname}</p>
              <p className="text">{data.musicDTO.genre}</p>
            </Text>
          </Contents>
        ))}
      </Slider>
    </Container>
  );
};
export default CatouselSlider;
