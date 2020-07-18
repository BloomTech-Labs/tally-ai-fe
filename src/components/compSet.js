import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import "./compSet.scss";

function CompSet(props) {
  return (
    <div className="favorites-section">
      {props.favorites.map((favorite) => {
        return (
          <Card className="card">
            <CardActionArea className="card-action-area">
              <img src={favorite.businessImg}></img>
              <CardContent>
                <Typography>
                  <h3>{favorite.businessName}</h3>
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions classname="card-actions">
              {/* <Button variant="contained" color="primary"> */}
              <Button
                className="card-btn"
                variant="contained"
                color="secondary"
              >
                <Link
                  className="btn-links"
                  onClick={() => {
                    props.addBusiness(favorite);
                  }}
                  to="/dashboard"
                >
                  View
                </Link>
              </Button>
              {/* </Button> */}
              <Button
                className="card-btn"
                variant="contained"
                color="secondary"
                onClick={() => {
                  props.setFavorites(
                    props.favorites.filter((fav) => !(fav === favorite))
                  );
                }}
              >
                Remove
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}

export default CompSet;
