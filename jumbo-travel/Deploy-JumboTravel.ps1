docker-compose -f docker-compose.yml up -d
docker exec keycloak /opt/jboss/keycloak/bin/add-user-keycloak.sh -u admin -p admin
npm run jumbo
