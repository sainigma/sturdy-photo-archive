## Schema tables

 1. [ users ](#users)
 2. [photos](#photos)
 3. [comments](#comments)
 4. [location](#location)
 5. [cities](#cities)
 6. [permissions](#permissions)
 7. [labels](#labels)
 8. [albums](#albums)
 9. [userverification](#userverification)
 
 <a  name="users"></a>
## users
| column | type   | description |
|--|--|--|
|id|uuid||
|name|text||
|username|text||
|email|text||
|hash|text|For authentication|
|active|bool|Real or dummy account?|
|alive|bool|User is still alive?|
|parents|uuid[]|List of parents, of same type as **this**|
|spouses|uuid[]|same, where last is active (NULL if none)|
|children|uuid[]|same|
|siblings|uuid[]|same|
|friends|uuid[]|same|
|coverphoto|uuid|Link to a public [photo](#photos)|
|location|uuid|Link to a [location](#location)|
|owner|uuid|Normally null, used when user is dummy|

 <a  name="photos"></a>
## photos
| column | type   | description |
|--|--|--|
| id  | uuid | - |
| name|text|-|
| description |text|-|
| people |uuid[]|List of [users](#user) in photo|
| labels |uuid[]|[Labels](#labels) generated for photo|
| albums |uuid[]|Photo part of [albums](#albums)|
| [comments](#comments) |uuid[]|List of top-level comments on photo|
| daterange |daterange|When the photo was taken, ambiguous|
| [location](#location) |uuid|Reference to location|
| locHeight |double|Offset from ground|
| locAzimuth |double|Offset from north in radians|
| locAltitude |double|Offset from horizon in radians|
| [owner](#user) |uuid|Reference to owning user|
| [permissions](#permissions) | uuid[]||
| equirectangular |bool|Photo is panoramic if true|
| priority |integer|Integer for sorting, e.g if multiple photos accessed share date|

A photo can have multiple permissions, both from owner and people contained in the photo. All permissions are checked independently, so the most unrestricted rights always win. If user with permission rights is no longer active, the rights are inherited by next of kin.
 <a  name="comments"></a>
## comments
|column|type|description|
|--|--|--|
|id|uuid|
|content|text|Comment
|date|date|
|[userid](#users)|uuid|Comment sent by this user
|children|uuid[]|Top-level replies to comment, of same type as **this**

 <a  name="location"></a>
## location
| column | type   | description |
|--|--|--|
|id|uuid||
|name|text||
|description|text||
|comments|uuid[]|List of top-level [comments](#comments)|
|latitude|double||
|longitude|double||
|[owner](#users)|uuid||
|[permissions](#permissions)|uuid|
|address|text||
|postalcode|text||
|[city](#cities)|uuid||

Owner of location determines who can search and tag said location

 <a  name="cities"></a>
## cities
| column | type   | description |
|--|--|--|
|id|uuid||
|name|text||
|state|text||
|country|text||

 <a  name="permissions"></a>
## permissions
| column | type   | description |
|--|--|--|
|id|uuid|-|
|refid|uuid|Permission refers to this datablock|
|user|uuid|Permissions set by|
| permissionChainDegreeLateral |integer|How far from user the datablock is accessible|
| permissionChainDegreeParent |integer|same|
| permissionChainDegreeChild |integer|same|
| permissionChainDegreeSpouse| integer|same|
| permissionChainDegreeFriend| integer|same|

Description for permission values:

|value|lateral/parent/child|spouse|friend|
|--|--|--|--|
|-1|public|public|public|
|0|only owner can see|same|same|
|1|a relative can see|same|best friend can see|
|2|a relative can share to relatives by degree of separation of 1|same|top 2 friends can see|
|n|a relative can share to relatives by degree of separation of n-1|same|top n friends can see|

<a  name="labels"></a>
## labels
<a  name="albums"></a>
## albums
<a name="userverification"></a>
## userverification

| column | type   | description |
|--|--|--|
|username|text|-|
|verification|text|hash for verification|
|timestamp|timestamp without timezone|verification is rejected if it's too old|

Notes
 - [ ] Make garbage collector that periodically cleans userverification and users tables from unverified entries