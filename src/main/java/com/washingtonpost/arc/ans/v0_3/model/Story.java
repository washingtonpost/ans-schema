package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * A story.
 * <p>
 * Holds attributes of an ANS story.
 *
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Story extends Collection {

    public static final String TYPE = "story";

    public Story() {
        setType(TYPE);
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .appendSuper(super.hashCode())
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Story) == false) {
            return false;
        }
        Story that = ((Story) other);
        return that.canEqual(this) &&
                new EqualsBuilder()
                .appendSuper(super.equals(other))
                .isEquals();
    }
    
    @Override
    public boolean canEqual(Object other) {
        return (other instanceof Story);
    }
}
