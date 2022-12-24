import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router';
import AppContext from '../AppContext';

function WithRouter(props) {
  const router = {};
  router.location = useLocation();
  router.navigate = useNavigate();
  router.params = useParams();
  router.query = {};
  var query = router.location.search && router.location.search.length > 0 ? router.location.search.substring(1).split('&').map(z => { const item = z.split("="); return { Key: item[0], Value: item[1] } }) : [];
  query.forEach(element => {
    router.query[element.Key] = element.Value;
  });
  
  const Child = props.children;
  return (
    <Child {...{ router }} {...props} />
  );
}

export default WithRouter;
//const params = new URLSearchParams(window.location.search)
//params.getAll('name') params.get('name')