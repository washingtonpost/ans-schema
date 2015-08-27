
package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;


/**
 * Models a tuple of social media information (e.g. "what's your profile page on facebook"?)
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Social {

    @JsonProperty("site")
    private String site;
    @JsonProperty("url")
    private String url;

    /**
     * @return The name of the social media site (e.g. "twitter", "facebook", etc)
     */
    public String getSite() {
        return site;
    }

    /**
     * @param site The name of the social media site (e.g. "twitter", "facebook", etc)
     */
    public void setSite(String site) {
        this.site = site;
    }

    /**
     * @return A (possibly deep) link to the {@code site}
     */
    public String getUrl() {
        return url;
    }

    /**
     * @param url A (possibly deep) link to the {@code site}
     */
    public void setUrl(String url) {
        this.url = url;
    }


    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(site).append(url).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Social) == false) {
            return false;
        }
        Social rhs = ((Social) other);
        return new EqualsBuilder().append(site, rhs.site).append(url, rhs.url).isEquals();
    }

}
