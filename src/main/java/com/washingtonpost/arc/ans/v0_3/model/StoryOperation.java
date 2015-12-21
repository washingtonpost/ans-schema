package com.washingtonpost.arc.ans.v0_3.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.ArrayList;
import java.util.List;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;

/**
 * <p>Representation an operation on an ANS Story object</p>
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public final class StoryOperation implements TraitId {

    @JsonProperty("_id")
    private String id;

    @JsonProperty("date")
    private String date;

    @JsonProperty("operation")
    private String operation;

    public StoryOperation() {
    }

    @Override
    public String getId() {
        return id;
    }

    @Override
    public void setId(String id) {
        this.id = id;
    }

    public void setOperation(String operation) {
        this.operation = operation;
    }

    public String getOperation() {
        return operation;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder()
                .append(this.operation)
                .append(this.id)
                .append(this.date)
                .toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if (!(other instanceof StoryOperation)) {
            return false;
        }
        StoryOperation that = ((StoryOperation) other);
        return that.canEqual(this)
                && new EqualsBuilder()
                .append(this.operation, that.operation)
                .append(this.id, that.id)
                .append(this.date, that.date)
                .isEquals();
    }

    public boolean canEqual(Object other) {
        return (other instanceof StoryOperation);
    }
}
