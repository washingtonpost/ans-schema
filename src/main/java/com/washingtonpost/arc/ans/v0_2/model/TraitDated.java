
package com.washingtonpost.arc.ans.v0_2.model;

import java.util.Date;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;


/**
 * Dated trait
 * <p>
 * Trait that applies common publishing-related dates to a schema.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonPropertyOrder({
    "created_date",
    "last_updated_date"
})
public interface TraitDated {

    /**
     * When the content was originally created (RFC3339-formatted).
     * 
     * @return
     *     The createdDate
     */
    @JsonProperty("created_date")
    public Date getCreatedDate();

    /**
     * When the content was originally created (RFC3339-formatted).
     * 
     * @param createdDate
     *     The created_date
     */
    @JsonProperty("created_date")
    public void setCreatedDate(Date createdDate);

    /**
     * When the content was last updated (RFC3339-formatted).
     * 
     * @return
     *     The lastUpdatedDate
     */
    @JsonProperty("last_updated_date")
    public Date getLastUpdatedDate();

    /**
     * When the content was last updated (RFC3339-formatted).
     * 
     * @param lastUpdatedDate
     *     The last_updated_date
     */
    @JsonProperty("last_updated_date")
    public void setLastUpdatedDate(Date lastUpdatedDate);
}
