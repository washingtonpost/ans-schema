
package com.washingtonpost.arc.ans.v0_2.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.apache.commons.lang3.builder.ToStringBuilder;


/**
 * Credit for a piece of content.
 * <p>
 * Models attribution to an individual or group for contribution towards some content item.
 * 
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Credit {

    /**
     * The name of contributor.
     * (Required)
     * 
     */
    @JsonProperty("name")
    private String name;
    /**
     * The (optional) organization the contributor belongs to.
     * 
     */
    @JsonProperty("org")
    private String org;
    /**
     * The role the contributor played in the content.
     * (Required)
     * 
     */
    @JsonProperty("role")
    private String role;

    /**
     * The name of contributor.
     * (Required)
     * 
     * @return
     *     The name
     */
    @JsonProperty("name")
    public String getName() {
        return name;
    }

    /**
     * The name of contributor.
     * (Required)
     * 
     * @param name
     *     The name
     */
    @JsonProperty("name")
    public void setName(String name) {
        this.name = name;
    }

    /**
     * The (optional) organization the contributor belongs to.
     * 
     * @return
     *     The org
     */
    @JsonProperty("org")
    public String getOrg() {
        return org;
    }

    /**
     * The (optional) organization the contributor belongs to.
     * 
     * @param org
     *     The org
     */
    @JsonProperty("org")
    public void setOrg(String org) {
        this.org = org;
    }

    /**
     * The role the contributor played in the content.
     * (Required)
     * 
     * @return
     *     The role
     */
    @JsonProperty("role")
    public String getRole() {
        return role;
    }

    /**
     * The role the contributor played in the content.
     * (Required)
     * 
     * @param role
     *     The role
     */
    @JsonProperty("role")
    public void setRole(String role) {
        this.role = role;
    }

    @Override
    public String toString() {
        return ToStringBuilder.reflectionToString(this);
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder().append(name).append(org).append(role).toHashCode();
    }

    @Override
    public boolean equals(Object other) {
        if (other == this) {
            return true;
        }
        if ((other instanceof Credit) == false) {
            return false;
        }
        Credit rhs = ((Credit) other);
        return new EqualsBuilder().append(name, rhs.name).append(org, rhs.org).append(role, rhs.role).isEquals();
    }

}
