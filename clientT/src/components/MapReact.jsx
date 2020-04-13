import React, { Component } from "react";
import {
  YMaps,
  Map,
  Clusterer,
  ZoomControl,
  Placemark,
  ObjectManager,
  GeolocationControl,
} from "react-yandex-maps";

import meIcon from "../assets/map/point-me.svg";

const YA_API = "baa80640-f2e6-464d-b4c0-8924b020be18";

export default class MapReact extends Component {
  constructor(props) {
    super(props);

    this.state = {
      coordsPl: null,
      selectF: true,
      center: null,
    };
  }

  componentDidMount() {
    const { marks } = this.props;

    if (marks.length > 0)
      this.setState({
        defaultCenter: marks[marks.length - 1].geometry.coordinates,
      });
  }

  componentWillReceiveProps(nextProps) {
    const { center } = nextProps;
    if (center) {
      this.setState({ center: [center.lat, center.lng] });
    }
  }

  handleClickMap = (e) => {
    const coords = e.get("coords");
    this.props.handleClickGetCoords(coords);

    this.setState({ coordsPl: coords });
  };

  handleObjectClick = (ref) => {
    if (!ref) return;
    return ref.objects.events.add("click", (e) => {
      if (this.state.selectF) {
        const position = e.get("domEvent").get("position");
        const objectId = e.get("objectId");
        const { id, label } = ref.objects.getById(objectId).properties;

        this.props.getSelected(id, label);
        this.props.handlePosition(position);
        this.props.handlePopup(true);

        this.setState({ selectF: false });
      }
      setTimeout(() => this.setState({ selectF: true }), 1);
    });
  };

  handleSetCenter = (coords) => {
    this.setState({ center: coords });
  };

  render() {
    const { marks, notes, placemark } = this.props;
    let { coordsPl, center, defaultCenter } = this.state;

    center = center ? center : defaultCenter;

    return (
      <YMaps
        // enterprise
        query={{
          apikey: YA_API,
          lang: "en_US",
        }}
      >
        <Map
          style={{ width: "100%", height: "100%" }}
          // instanceRef={inst => inst.events.add("dblclick", handleClickMap)}
          onClick={this.handleClickMap}
          // defaultState={{
          //   center: center || [55.79827356447633, 37.7755409362457],
          //   zoom: 12
          // }}
          state={{
            center: center || [55.79827356447633, 37.7755409362457],
            zoom: 11,
          }}
        >
          <GeolocationControl
            options={{
              float: "right",
              iconLayout: "default#image",
              // Custom image for the placemark icon.
              iconImageHref: meIcon,
              // The size of the placemark.
              iconImageSize: [30, 42],
              // The offset of the upper left corner of the icon relative
              // to its "tail" (the anchor point).
              iconImageOffset: [-3, -42],
            }}
          />
          <ZoomControl options={{ float: "left" }} />

          {placemark && coordsPl && <Placemark geometry={coordsPl} />}

          {notes && (
            <ObjectManager
              options={{
                clusterize: true,
                gridSize: 32,
              }}
              objects={{
                preset: "islands#blueDotIcon",
              }}
              clusters={{
                preset: "islands#blueClusterIcons",
              }}
              features={notes}
              // modules={[
              //   "objectManager.addon.objectsBalloon",
              //   "objectManager.addon.objectsHint"
              // ]}
              instanceRef={this.handleObjectClick}
            />
          )}
          {marks && (
            <ObjectManager
              options={{
                // hasHint: true,
                clusterize: true,
                gridSize: 32,
              }}
              objects={{
                // openBalloonOnClick: true,
                preset: "islands#redDotIcon",
                // preset: "default#image"
                // iconImageHref: clickIcon,
                // iconImageSize: [40, 40],
                // iconImageOffset: [-20, -40]
              }}
              clusters={{
                preset: "islands#redClusterIcons",
              }}
              features={marks}
              // modules={[
              //   "objectManager.addon.objectsBalloon",
              //   "objectManager.addon.objectsHint"
              // ]}
              instanceRef={this.handleObjectClick}
            />
          )}
        </Map>
      </YMaps>
    );
  }
}

{
  /*  <Clusterer
      options={{
        preset: "islands#invertedVioletClusterIcons",
        groupByCoordinates: false
      }}
    >
    points &&
    points.map((coordinates, index) => (
      <Placemark key={index} geometry={coordinates} />
    ))
    </Clusterer>
    */
}
