import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { setFavorites } from "../actions/index";

//needs to be passed a business object of this format:
// business: {
//     // for DS API calls
//     businessId: null,
//     // for side bar
//     businessName: null,
//     businessImg: null,
//     // for top-of-page info cards
//     reviewCount: 0,
//     averageRating: 0
//   }

const ToggleFavoriteButton = (props) => {

    const [favorited, setFavorited] = useState();

    useEffect(() => {
        setFavorited(false);
        if (props.business) {
            props.favorites.forEach((favorite) => {
                console.log(favorite.businessId, "===", props.business.id);
                if (favorite.businessId === props.business.id) {
                    setFavorited(true);
                }
            })
        }
    }, [props.favorites])

    let favSrc = "https://image.flaticon.com/icons/svg/149/149220.svg";

    if (props.error || !props.business || !props.favorites) {//had an error or data not in props yet, just default to unfavorited icon
        return <div><img src={favSrc} style={{ width: "20px", height: "20px" }}></img>err</div>
    }

    if (favorited) favSrc = "https://image.flaticon.com/icons/svg/148/148839.svg";

    function toggle(e) {
        if (!props.isSettingFavorites && props.business) {//make sure we're not trying to toggle again before the last toggle has even reached the backend and come back again (would happen when the user clicks repeatedly)
        console.log("BUTTON SETTING FAVS", props.favorites.concat([props.business]));   
        if(!favorited){ 
        props.setFavorites(props.favorites.concat([{...props.business, businessId: props.business.id}]), 0);//duplicate and add new favorite, and set state
        }else{
            props.setFavorites(props.favorites.filter((fav) => { return !(fav.businessId === props.business.id) }), 0);//duplicate and remove favorite, and set state
        }
        }
    }

    return (<img src={favSrc} style={{ width: "20px", height: "20px" }} onClick={(e) => { toggle(e) }}></img>)

}

const mapStateToProps = state => ({
    favorites: state.favorites.favorites,
    isSettingFavorites: state.favorites.isSetting,
    error: state.favorites.error
});

export default connect(mapStateToProps, {
    setFavorites
})(ToggleFavoriteButton);
