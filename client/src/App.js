import React, {useEffect, useState} from 'react';
import './styles/style.css';
import InteractiveFloorPlan from "./components/InteractiveFloorPlan/InteractiveFloorPlan";
import Filter from "./components/Filter/Filter";
import Sorting from "./components/Sorting/Sorting";
import FlatCards from "./components/FlatCards/FlatCards";
import axios from "axios";
import MyModal from "./components/UI/MyModal/MyModal";
import Pagination from "./components/Pagination/Pagination";



function App() {
    const [flats, setFlats] = useState([]);
    const [flat, setFlat] = useState({});

    const [selectedByValue, setSelectedByValue] = useState(0);
    const [selectedByParams, setSelectedByParams] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect( ()=>{
        fetchingFilteredFlats('');
    }, [])

    const fetchingFilteredFlats = async (queryString) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/filter?sv=${selectedByValue}&sp=${selectedByParams}${queryString}`);
        setFlats(response.data);
        setCurrentPage(1);
    }

    const fetchingFlatByID = async(id) => {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/${id}`);
        setFlat(response.data);
        setModalVisible(true);
    }

    const fetchingFlatByFloorPosition = async (floor, position)=> {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/map?fl=${floor}&p=${position}`);
        setFlat(response.data);
        setModalVisible(true);
    }

    const onChangeValue = (selected) => {
        setSelectedByValue(selected);
    }

    const onChangeParams = (selected) => {
        setSelectedByParams(selected);
    }

    const flatsPerPage = 5;
  return (
      <div className="wrapper" >
        <MyModal flat={flat} visible={modalVisible} setVisible={setModalVisible}>Hallo world!</MyModal>

        <h1>ЖИЛОЙ КВАРТАЛ "ВЕСЁЛЫЕ АЛЛЕИ"</h1>

        <div className="hiddenAreaName">
          <div>ВЕСЁЛЫЕ</div>
          <div>АЛЛЕИ</div>
          <div>ЖИЛОЙ КВАРТАЛ</div>
        </div>
        <div className="containerTop">
          <InteractiveFloorPlan
              numberOfFloors={4}
              callback={(floor, position)=>fetchingFlatByFloorPosition(floor, position)}
          />
          <div className="containerRightSide">
            <div className="residentialAreaName">
              <div>ВЕСЁЛЫЕ</div>
              <div>АЛЛЕИ</div>
              <div className="residentialAreaName__short">ЖИЛОЙ КВАРТАЛ</div>
            </div>
                <Filter
                    selectedByValue={selectedByValue}
                    selectedByParams={selectedByParams}
                    callbackFetching={fetchingFilteredFlats}
                />
                <Sorting
                    value={selectedByValue}
                    params={selectedByParams}
                    onChangeValue={event => onChangeValue(event)}
                    onChangeParams={event => onChangeParams(event)}
                />
          </div>
        </div>
        <FlatCards cards={[...flats].slice(currentPage*flatsPerPage-flatsPerPage, currentPage*flatsPerPage)} callback={(id)=>fetchingFlatByID(id)}/>


          {(Math.ceil(flats.length/flatsPerPage) > 1)
              ? <Pagination totalFlats={flats.length} flatsPerPage={flatsPerPage} currentPage={currentPage}
                            setCurrentPage={setCurrentPage}/>
              : null
          }
          </div>
  );
}

export default App;
