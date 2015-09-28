package com.washingtonpost.arc.ans.v0_3.model;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import nl.jqno.equalsverifier.EqualsVerifier;
import nl.jqno.equalsverifier.Warning;
import static org.junit.Assert.assertEquals;
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

    /**
     * <p>At first glance this test seems to just be testing an axiom like "foo.setX(1).getX() == 1" but it's designed to make
     * sure application engineers who extend the object model below the ANS root object remember to define a distinct type and
     * set that TYPE on their type field; this is important for downstream users of our ANS JAR such as Jackson (de)serializers
     * and Mongojack frameworks.</p>
     * @throws Exception
     */
    @Test
    public void testTypeIsSetCorrectly() throws Exception {
        Field typeField = getTargetClass().getField("TYPE");
        Method getTypeMethod = getTargetClass().getMethod("getType");
        Object ansObject = getTargetClass().newInstance();
        String declaredType = (String)typeField.get(ansObject);

        assertEquals(declaredType, getTypeMethod.invoke(ansObject));
    }
}
