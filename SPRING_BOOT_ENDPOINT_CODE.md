# Spring Boot Endpoint Code for Metro Coordinates

## Step 1: Add DTO Class

Create file: `src/main/java/com/federal/model/web/MetroWithCoordinatesDTO.java`

```java
package com.federal.model.web;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

/**
 * DTO for returning metropolitan areas with their coordinates.
 * Used by the /query/metros_with_coordinates endpoint.
 */
@Getter
@Setter
public class MetroWithCoordinatesDTO {
    private String name;
    private String state;
    private BigDecimal latitude;
    private BigDecimal longitude;
}
```

## Step 2: Add Method to MetroRankDao Interface

Add this method to `MetroRankDao.java`:

```java
/**
 * Returns all metropolitan areas with their coordinates.
 * Only returns metros that have coordinates in the database.
 */
List<MetroWithCoordinatesDTO> getMetropolitanAreasWithCoordinates();
```

## Step 3: Implement in MetroRankDaoImpl

Add this method and mapper to `MetroRankDaoImpl.java`:

```java
public class MetroWithCoordinatesMapper implements RowMapper<MetroWithCoordinatesDTO> {
    @Override
    public MetroWithCoordinatesDTO mapRow(ResultSet rs, int rowNum) throws SQLException {
        MetroWithCoordinatesDTO dto = new MetroWithCoordinatesDTO();
        dto.setName(rs.getString(COL_METRO));
        dto.setState(rs.getString(AgencyDaoImpl.STATE));
        
        BigDecimal lat = rs.getBigDecimal("latitude");
        BigDecimal lon = rs.getBigDecimal("longitude");
        
        // Only set if not null
        if (lat != null) {
            dto.setLatitude(lat);
        }
        if (lon != null) {
            dto.setLongitude(lon);
        }
        
        return dto;
    }
}

@Override
public List<MetroWithCoordinatesDTO> getMetropolitanAreasWithCoordinates() {
    String sql = "SELECT DISTINCT agency.metro, agency.state, agency.latitude, agency.longitude " +
                 "FROM agency " +
                 "WHERE agency.urbanized_population >= 500000 " +
                 "AND agency.latitude IS NOT NULL " +
                 "AND agency.longitude IS NOT NULL " +
                 "ORDER BY agency.metro";
    
    return template.query(sql, new MetroWithCoordinatesMapper());
}
```

## Step 4: Add Method to MetroRankService

Add this method to `MetroRankService.java`:

```java
public List<MetroWithCoordinatesDTO> getMetropolitanAreasWithCoordinates() {
    return dao.getMetropolitanAreasWithCoordinates();
}
```

## Step 5: Add Endpoint to QueryController

Add this endpoint to `QueryController.java`:

```java
@PostMapping("/query/metros_with_coordinates")
public ResponseEntity<List<MetroWithCoordinatesDTO>> getMetropolitanAreasWithCoordinates() {
    List<MetroWithCoordinatesDTO> list = metroRankService.getMetropolitanAreasWithCoordinates();
    return ResponseEntity.ok(list);
}
```

## Summary

After adding these changes:
1. Rebuild your Spring Boot application
2. The endpoint `POST /query/metros_with_coordinates` will return:
   ```json
   [
     {
       "name": "San Francisco-Oakland-Berkeley, CA",
       "state": "CA",
       "latitude": 37.774900,
       "longitude": -122.419400
     },
     ...
   ]
   ```
3. Your frontend map will automatically use this endpoint (it's already configured in index.html)

