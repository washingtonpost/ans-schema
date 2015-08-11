package com.washingtonpost.arc.ans.v0_2.model;

import java.util.HashMap;
import java.util.Map;
import com.fasterxml.jackson.annotation.JsonAnyGetter;
import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import java.util.Date;
import java.util.List;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * A content object.
 * <p>
 * Holds common attributes of ANS Content objects.
 *
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Content implements TraitGuid, TraitDated, TraitCredited, TraitLocale, TraitLocated, TraitCopyrighted {

    private String guid;
    private Date createdDate;
    private Date lastUpdatedDate;
    private List<Credit> credits;
    private String language;
    private String location;
    private Geo geo;
    private Address address;
    private String copyright;

    @JsonIgnore
    private final Map<String, Object> additionalProperties = new HashMap<>();


    @Override
    public String getGuid() {
        return this.guid;
    }

    @Override
    public void setGuid(String guid) {
        this.guid = guid;
    }

    @Override
    public Date getCreatedDate() {
        return this.createdDate;
    }

    @Override
    public void setCreatedDate(Date createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public Date getLastUpdatedDate() {
        return this.lastUpdatedDate;
    }

    @Override
    public void setLastUpdatedDate(Date lastUpdatedDate) {
        this.lastUpdatedDate = lastUpdatedDate;
    }

    @Override
    public List<Credit> getCredits() {
        return this.credits;
    }

    @Override
    public void setCredits(List<Credit> credit) {
        this.credits = credit;
    }

    @Override
    public String getLanguage() {
        return this.language;
    }

    @Override
    public void setLanguage(String language) {
        this.language = language;
    }

    @Override
    public String getLocation() {
        return this.location;
    }

    @Override
    public void setLocation(String location) {
        this.location = location;
    }

    @Override
    public Geo getGeo() {
        return this.geo;
    }

    @Override
    public void setGeo(Geo geo) {
        this.geo = geo;
    }

    @Override
    public Address getAddress() {
        return this.address;
    }

    @Override
    public void setAddress(Address address) {
        this.address = address;
    }

    @Override
    public String getCopyright() {
        return this.copyright;
    }

    @Override
    public void setCopyright(String copyright) {
        this.copyright = copyright;
    }

    @JsonAnyGetter
    public Map<String, Object> getAdditionalProperties() {
        return this.additionalProperties;
    }

    @JsonAnySetter
    public void setAdditionalProperty(String name, Object value) {
        this.additionalProperties.put(name, value);
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(guid)
                .append(createdDate)
                .append(lastUpdatedDate)
                .append(credits)
                .append(language)
                .append(location)
                .append(geo)
                .append(address)
                .append(copyright)
                .append(additionalProperties)
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Content) == false) {
            return false;
        }
        Content rhs = ((Content) other);
        return new EqualsBuilder()
                .append(guid, rhs.guid)
                .append(createdDate, rhs.createdDate)
                .append(lastUpdatedDate, rhs.lastUpdatedDate)
                .append(credits, rhs.credits)
                .append(language, rhs.language)
                .append(location, rhs.location)
                .append(geo, rhs.geo)
                .append(address, rhs.address)
                .append(copyright, rhs.copyright)
                .append(additionalProperties, rhs.additionalProperties)
                .isEquals();
    }
}
