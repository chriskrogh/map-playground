export const BASE_STYLE_KEY = "baseStyle";

export const OPENING = `
<?xml version="1.0" encoding="UTF-8"?>
<kml xmlns="http://earth.google.com/kml/2.2">
  <Document>
    <name>
      <![CDATA[Regions]]>
    </name>
    <open>1</open>
    <Style id="${BASE_STYLE_KEY}">
      <IconStyle>
          <scale>0</scale>
      </IconStyle>
      <LineStyle>
        <color>ff333333</color>
        <width>1</width>
      </LineStyle>
    </Style>
`;

export const CLOSING = `
  </Document>
</kml>
`;
