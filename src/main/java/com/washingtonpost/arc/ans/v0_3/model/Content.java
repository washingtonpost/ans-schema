package com.washingtonpost.arc.ans.v0_3.model;

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
public class Content extends ANS implements TraitDated, TraitCredited, TraitLocale, TraitLocated, TraitCopyrighted {

    public static final String TYPE = "content";
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

    public Content() {
        setType(TYPE);
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
                .append(createdDate)
                .append(lastUpdatedDate)
                .append(credits)
                .append(language)
                .append(location)
                .append(geo)
                .append(address)
                .append(copyright)
                .append(additionalProperties)
                .appendSuper(super.hashCode())
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
        Content that = ((Content) other);
        return that.canEqual(this) &&
                new EqualsBuilder()
                .append(createdDate, that.createdDate)
                .append(lastUpdatedDate, that.lastUpdatedDate)
                .append(credits, that.credits)
                .append(language, that.language)
                .append(location, that.location)
                .append(geo, that.geo)
                .append(address, that.address)
                .append(copyright, that.copyright)
                .append(additionalProperties, that.additionalProperties)
                .appendSuper(super.equals(other))
                .isEquals();
    }

    /**
     * See http://www.artima.com/lejava/articles/equality.html for why we're doing this (it's essentially required at all levels
     * of a heirarchy to make the .equals() reflexivity property work.
     *
     * @param other The object we're being compared against
     * @return true, if it's an instanceof this class type
     */
    @Override
    public boolean canEqual(Object other) {
        return (other instanceof Content);
    }
}
