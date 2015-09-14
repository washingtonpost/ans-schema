package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * <p>Some headline content, with an optional purpose/channel/audience marker for the headline content (e.g. "the headline
 * for twitter" or "the default print headline")
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Headline {

    @JsonProperty
    private String headline;

    @JsonProperty
    private String purpose;

    /**
     * @return The headline content to display
     */
    public String getHeadline() {
        return headline;
    }

    /**
     * @param headline The headline content to display
     */
    public void setHeadline(String headline) {
        this.headline = headline;
    }

    /**
     * @return An arbitrary string that may mean something to the presentation layer rendering the {@code headline} for purposes
     * of showing one headline for some channel or some audience (instead of a another headline).  For example, a Story might
     * have an array of 2 headlines: one longer headline with purpose "default" that's shown in most renderings of the story
     * and another headline with channel "twitter" that the presentation logic knows to use when rendering a twitter icon or
     * twitter feed.
     */
    public String getPurpose() {
        return purpose;
    }

    /**
     * @param purpose An arbitrary string that may mean something to the presentation layer rendering the {@code headline} for
     * purposes of showing one headline for some channel or some audience (instead of a another headline).  For example, a Story
     * might have an array of 2 headlines: one longer headline with purpose "default" that's shown in most renderings of the
     * story and another headline with channel "twitter" that the presentation logic knows to use when rendering a twitter icon
     * or twitter feed.
     */
    public void setPurpose(String purpose) {
        this.purpose = purpose;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(headline).append(purpose).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Headline) == false) {
            return false;
        }
        Headline rhs = ((Headline) other);
        return new EqualsBuilder().append(headline, rhs.headline).append(purpose, rhs.purpose).isEquals();
    }
}
