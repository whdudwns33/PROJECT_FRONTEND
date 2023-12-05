import { useEffect } from "react";
import MapMarker from "../../images/MapMarker.png";

const { kakao } = window;

const KakaomapComponent = () => {

  useEffect(() => {
  const Container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
  const options = { //지도를 생성할 때 필요한 기본 옵션
    center: new kakao.maps.LatLng(37.498712, 127.031904), //지도의 중심좌표.
    level: 3 //지도의 레벨(확대, 축소 정도)
  };
  const map = new kakao.maps.Map(Container, options); //지도 생성 및 객체 리턴

  const imageSrc = MapMarker,
        imageSize = new kakao.maps.Size(40),
        imageOption = { offset: new kakao.maps.Point(20, 48.94) };

  const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
  const markerPosition = new kakao.maps.LatLng(37.498712, 127.031904);

  // 마커를 생성합니다
  const marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage // Add this line to set the marker image
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // Geocoder 객체를 생성합니다
  const geocoder = new window.kakao.maps.services.Geocoder();

  // 테이블 데이터를 가져옵니다
  const tableData = [
    // 예시 데이터입니다. 실제 데이터로 교체해야 합니다
    { address: '서울특별시 강남구 테헤란로 134' },
    { address: '서울특별시 강남구 테헤란로 126' },
    { address: '서울특별시 강남구 강남대로94길 56-4' },
    { address: '서울특별시 강남구 테헤란로 124' },
    // ...
  ];

  // 각 데이터 주소에 따라 지도 위에 마커를 표시합니다
  tableData.forEach(data => {
    geocoder.addressSearch(data.address, function(result, status) {
      if (status === window.kakao.maps.services.Status.OK) {
        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);

        // 마커를 생성하고 지도에 표시합니다
        const marker = new window.kakao.maps.Marker({
          map: map,
          position: coords
        });
      }
    });
  });

}, []);

return (
  <>
    <div id="map" style={{
      width: "100%",
      height: "100%",
    }}> 
    </div>
  </>
  )
}

export default KakaomapComponent;
