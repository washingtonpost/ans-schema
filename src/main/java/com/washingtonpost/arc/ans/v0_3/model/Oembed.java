package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * <p>Models an audio element(s) in an ANS Content object</p>
 */
public class Oembed extends ANS {

    public static final String TYPE = "oembed";

    @JsonProperty("providerUrl")
    private String providerUrl;

    @JsonProperty("objectUrl")
    private String objectUrl;

    public Oembed() {
        setType(TYPE);
    }

    /**
     * @return The source of the audio
     */
    public String getProviderUrl() {
        return providerUrl;
    }

    /**
     * @param providerUrl The source of the audio
     */
    public void setProviderUrl(String providerUrl) {
        this.providerUrl = providerUrl;
    }

    /**
     * @return The objectUrl of the audio
     */
    public String getObjectUrl() {
        return objectUrl;
    }

    /**
     * @param objectUrl The objectUrl of the audio
     */
    public void setObjectUrl(String objectUrl) {
        this.objectUrl = objectUrl;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(providerUrl)
                .append(objectUrl)
                .appendSuper(super.hashCode())
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        boolean result = false;

        if (other instanceof Oembed) {
            Oembed that = (Oembed) other;
            result = that.canEqual(this)
                    && new EqualsBuilder()
                    .append(providerUrl, that.providerUrl)
                    .append(objectUrl, that.objectUrl)
                    .appendSuper(super.equals(other))
                    .isEquals();
        }
        return result;
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
        return (other instanceof Oembed);
    }

}
