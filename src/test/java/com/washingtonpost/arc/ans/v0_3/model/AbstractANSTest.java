package com.washingtonpost.arc.ans.v0_3.model;

import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;
import org.junit.Test;

/**
 * <p>This test stresses any of the objects that descend from the top-level ANS class; this differs only from our base
 * AbstractTest in the treatment of the testEqualsAndHashCode method, which needs the additional "withRedefinedSuperclass()"
 * usage because we don't want to consider our subclasses symmetrically equal to their superclasses.  See
 * http://www.jqno.nl/equalsverifier/2012/07/06/symmetry-does-not-equal-superclass-instance/ for more details</p>
 */
public abstract class AbstractANSTest<T> extends AbstractTest<T> {
    @Test
    @Override
    @SuppressWarnings("unchecked")
    public void testEqualsAndHashCode() {
        EqualsVerifier.forClass(getTargetClass())
                .suppress(Warning.STRICT_INHERITANCE, Warning.NONFINAL_FIELDS)
                .withRedefinedSuperclass()
                .verify();
    }
}
