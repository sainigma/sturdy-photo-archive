Dialog flow for file upload

                        +---------------+           +                                                +                           +
                        | +-----------+ |           |Options                                         |Extra special options      |Hyper special options
                        | |   Image   | |           |               +--------------+                 |                           |
                        | |           | |           |               | <-|Back      |                 |                           |
+--------------+        | +-----------+ |           |               +--------------+                 |   +------------+          |
| Choose photo +------->+ Image.jpg     |           +               | Name:        |                 +   | <-|Back    |          |
+--------------+        +---------------+   Transition to submenu   +--------------+ Trans to subsubmenu +------------+          |     +-----------+
| Options      +------------------------------------+-------------->+ Choose loc.  +-----------------+-->+ Dropdown   |          +     | <-|Back   |
+--------------+                                    |               +--------------+                 |   +---+--------+ subsubsubmenu  +-----------+
| Save         |                                    |               | 🗹 Fetch date +<-+              +       | New    +--------------->+ Name: req |
+------+-------+                                    |               +--------------+  |      Back to options +--------+                | Addr:     |
       |                                            +               | Special      ++ |    <-----------------+ Old    |          +     | Post:     |
       |                                            Back to main    +---------------| |      Replaces choose,+--------+          |     | City:     |
       |                                          <-+---------------+ Save         || |      adds cancel                         |     | Lon:      |
       |                                            |               +---------------+ |              +                           +     | Lat:      |
       |                                            |                               | |              |                 Back to options +-----------+
       v                                            |                               | |              +------------+  <-----------------+ Save      |
   Expect 200                                       |                               | |                           |                    +-----------+
                                                    |                               | | Appends  +--------------+ |              +
                                                    |                               | +--------->+ ☐ Fetch date | |              |
                                                    |                               |            +--------------+ |              +---------------------------+
                                                    |                               |            | Startdate:   | |
                                                    |                               |            +--------------+ |
                                                    |                               |            | End (optnl.):| |
                                                    |                               |            +--------------+ |
                                                    |                               |                             |     +-----------+
                                                    |                               |                             +     | <-|Back   |
                                                    |                               |   Transition to subsubmenu        +-----------+
                                                    |                               +---------------------------------->+ ☐ Panorama|
                                                    |                                                                   | ☐ Equirectangular
                                                    +                                                             +     | Azimuth:  |
                                                                                                                  |     | Altitude: |
                                                                                                                  |     | Offsets:  |
                                                                                                                  |     |  Height:  |
                                                                                                                  |     |  Lateral: +
                                                                                                                  |     |  Longitudal:
                                                                                                                  |     +-----------+
                                                                                                                  |     | Save      |
                                                                                                                  |     +-----------+
                                                                                                                  |
                                                                                                                  |
                                                                                                                  |
                                                                                                                  ++
