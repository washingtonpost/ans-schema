
package com.washingtonpost.arc.ans.v0_2.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


/**
 * Location related trait
 * <p>
 * Captures information related to the location of the content.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "location",
    "geo",
    "address"
})
public interface TraitLocated {

    /**
     * A description of the location, useful if a full address or lat/long specification is overkill.
     * 
     * @return
     *     The location
     */
    @JsonProperty("location")
    public String getLocation();

    /**
     * A description of the location, useful if a full address or lat/long specification is overkill.
     * 
     * @param location
     *     The location
     */
    @JsonProperty("location")
    public void setLocation(String location);

    /**
     * A geographical coordinate
     * 
     * @return
     *     The geo
     */
    @JsonProperty("geo")
    public Geo getGeo();

    /**
     * A geographical coordinate
     * 
     * @param geo
     *     The geo
     */
    @JsonProperty("geo")
    public void setGeo(Geo geo);

    /**
     * An Address following the convention of http://microformats.org/wiki/hcard
     * 
     * @return
     *     The address
     */
    @JsonProperty("address")
    public Address getAddress();

    /**
     * An Address following the convention of http://microformats.org/wiki/hcard
     * 
     * @param address
     *     The address
     */
    @JsonProperty("address")
    public void setAddress(Address address);
}
